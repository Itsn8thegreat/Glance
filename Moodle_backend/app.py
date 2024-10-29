import json  # Place all imports at the top of your Python file
from flask import Flask, jsonify
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

CAS_LOGIN_URL = "https://auth.manhattan.edu/idp/profile/cas/login"
ASSIGNMENTS_URL = "https://lms.manhattan.edu/calendar/view.php?view=upcoming"

def load_credentials():
    """Load credentials from editme.json."""
    with open('editme.json') as f:
        data = json.load(f)  # Load JSON content into a dictionary
    return data['username'], data['password']  # Replace with actual keys if different

def login_and_get_session(username, password):
    session = requests.Session()

    # Step 1: Load CAS login page
    response = session.get(CAS_LOGIN_URL)
    soup = BeautifulSoup(response.content, 'html.parser')

    # Debugging: Print the HTML content of the login page
    print(soup.prettify())  # Use this to check if the login page contains the execution input

    # Step 2: Extract the execution token with error handling
    execution_input = soup.find('input', {'name': 'execution'})
    if not execution_input:
        raise Exception("Execution token not found. Verify the login page structure.")

    execution_token = execution_input.get('value')

    # Step 3: Prepare login data
    login_data = {
        "username": username,
        "password": password,
        "execution": execution_token,
        "_eventId": "submit",
        "geolocation": ""
    }

    # Step 4: Submit the login request
    login_response = session.post(CAS_LOGIN_URL, data=login_data)
    if "invalid" in login_response.text.lower():
        raise Exception("Invalid credentials")

    return session

def fetch_assignments(session):
    # Fetch the assignments page
    response = session.get(ASSIGNMENTS_URL)
    soup = BeautifulSoup(response.content, 'html.parser')

    assignments = []
    events = soup.find_all('div', class_='event')

    for event in events:
        try:
            title = event.find('h3', class_='name').get_text(strip=True)
            due_date = event.find('a').get_text(strip=True)

            # Extract course name
            course_name = event.find('div', class_='fa-graduation-cap').find_next('div', class_='col-11').get_text(strip=True)

            assignments.append({
                'title': title,
                'course': course_name,
                'due_date': due_date
            })
        except AttributeError:
            continue  # Skip if data is incomplete

    return assignments

@app.route('/assignments', methods=['GET'])
def get_assignments():
    try:
        # Load credentials from editme.json
        username, password = load_credentials()

        # Login and create session
        session = login_and_get_session(username, password)

        # Fetch assignments
        assignments = fetch_assignments(session)

        if not assignments:
            return jsonify({"error": "No assignments found"}), 404

        return jsonify(assignments), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
