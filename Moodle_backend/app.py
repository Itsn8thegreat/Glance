import json
from flask import Flask, jsonify
from flask_cors import CORS
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import time
from bs4 import BeautifulSoup

# Flask app setup
app = Flask(__name__)
CORS(app)  # Enable CORS to allow React frontend access

# Define the URL of the LMS page
LMS_URL = "https://lms.manhattan.edu/calendar/view.php?view=upcoming"

def load_credentials(file_path):
    """Load username and password from the specified JSON file."""
    print("Loading credentials...")
    with open(file_path) as f:
        credentials = json.load(f)
    print("Credentials loaded.")
    return credentials['username'], credentials['password']

def login_and_get_session(username, password):
    """Use Selenium to log in and return the assignments page source."""
    print("Initializing Selenium WebDriver...")
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
    print("WebDriver initialized.")

    try:
        # Step 1: Open the LMS page
        driver.get(LMS_URL)
        print("Opened LMS page.")

        # Step 2: Wait for the login link to be clickable
        print("Waiting for the 'Log in' link to be clickable...")
        login_link = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.LINK_TEXT, "Log in")))
        login_link.click()
        print("Clicked the 'Log in' link.")

        # Step 3: Wait for the login form to be present
        print("Waiting for login form to be present...")
        WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.NAME, "j_username")))
        print("Login form is present.")

        # Step 4: Enter credentials into the login form
        print("Entering credentials...")
        driver.find_element(By.NAME, "j_username").send_keys(username)
        driver.find_element(By.NAME, "j_password").send_keys(password)

        # Step 5: Click the login button
        login_button = driver.find_element(By.NAME, "_eventId_proceed")
        login_button.click()
        print("Clicked the login button.")

        # Step 6: Wait for the login to complete
        print("Waiting for login to complete...")
        WebDriverWait(driver, 10).until(EC.url_changes(LMS_URL))
        print("Login completed.")

        # Step 7: Check for an error message
        time.sleep(2)  # Slight delay to allow page to load completely
        try:
            error_message = driver.find_element(By.ID, "error-msg").text
            if error_message:
                raise Exception(f"Login failed: {error_message}")
        except Exception:
            print("No error message detected after login attempt.")

        # Step 8: Wait for the Moodle assignments page to load
        print("Waiting for Moodle assignments page to load...")
        WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, "event")))  # Adjust as necessary
        print("Moodle assignments page loaded.")

        # Return the page source of the Moodle assignments page
        return driver.page_source

    except Exception as e:
        print(f"An error occurred: {e}")  # Debugging: print error message
        raise  # Reraise the exception after logging

    finally:
        driver.quit()  # Ensure driver is closed in any case

@app.route('/assignments', methods=['GET'])
def get_assignments():
    """API endpoint to fetch assignments."""
    print("Received request to get assignments.")
    try:
        # Load credentials from JSON
        username, password = load_credentials("editme.json")

        # Login and get an authenticated session
        assignments_page_source = login_and_get_session(username, password)
        print("Successfully logged in and retrieved page source.")

        # Parse the assignments from the page source
        soup = BeautifulSoup(assignments_page_source, 'html.parser')
        assignments = []
        events = soup.find_all('div', class_='event')  # Adjust as necessary for your needs

        for event in events:
            try:
                title = event.find('h3', class_='name').get_text(strip=True)
                due_date = event.find('a').get_text(strip=True)
                course_name = event.find('div', class_='fa-graduation-cap').find_next('div', class_='col-11').get_text(strip=True)

                assignments.append({
                    'title': title,
                    'course': course_name,
                    'due_date': due_date
                })
            except AttributeError:
                continue  # Skip events with missing data

        if not assignments:
            return jsonify({"error": "No assignments found"}), 404

        return jsonify(assignments), 200

    except Exception as e:
        # Handle any exceptions and return an error response
        print(f"Error in get_assignments: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    # Load credentials and run the Flask app
    print("Starting Flask app...")
    app.run(debug=True, port=5000)  # You can change host='0.0.0.0' for external access
