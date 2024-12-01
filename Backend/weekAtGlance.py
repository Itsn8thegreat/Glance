import json
from flask import Flask, jsonify
from flask_cors import CORS
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup
from threading import Thread
import requests
import time

# Flask app setup
app = Flask(__name__)
CORS(app)  # Enable CORS to allow React frontend access

# URLs
BANNER_URL = "https://lms.manhattan.edu/"
PROFILE_URL = "https://banner-ssb-prod.manhattan.edu/BEIS_PROD/c/SSB"
COURSE_SCHEDULE_URL = "https://banner-ssb-prod.manhattan.edu/PROD/bwskfshd.P_CrseSchd"

def load_credentials(file_path):
    """Load username and password from the specified JSON file."""
    with open(file_path) as f:
        credentials = json.load(f)
    return credentials['username'], credentials['password']

def extract_course_details(driver):
    """Extract course details from the datadisplaytable on the course schedule page."""
    try:
        # Get the page source and parse with BeautifulSoup
        soup = BeautifulSoup(driver.page_source, "html.parser")
        course_table = soup.find("table", class_="datadisplaytable")
        
        courses = []
        seen_courses = set()

        # Iterate through table rows and extract course information
        for row in course_table.find_all("tr"):
            cell = row.find("td", class_="ddlabel")
            if cell:
                course_text = cell.get_text(separator=" ").strip()

                # Avoid duplicates by checking if we've seen this course before
                if course_text not in seen_courses:
                    seen_courses.add(course_text)

                    # Extract the link
                    link = cell.find("a")["href"] if cell.find("a") else None
                    
                    # Split the course text by spaces, but handle timing and location separately
                    details = course_text.split(" ")

                    # The first part is the course name and number (e.g., CMPT 456-01)
                    course_name = details[0] + " " + details[1]  # Combining course name and number
                    course_number = details[2] if len(details) > 2 else "N/A"

                    # Now extract the timing and location more accurately
                    # Timing should be something like "Lecture 9:30 am-10:45 am"
                    timing_end_index = len(details) - 2  # Timing ends before the building/room part
                    timing = " ".join(details[3:timing_end_index]) if len(details) > 3 else "N/A"
                    
                    # Location is the last two parts (building and room number)
                    location = " ".join(details[timing_end_index:]) if len(details) > timing_end_index else "N/A"

                    courses.append({
                        "name": course_name,
                        "number": course_number,
                        "timing": timing,
                        "location": location,
                        "link": link
                    })

        return courses

    except Exception as e:
        print(f"Error extracting course details: {e}")
        return []

def login_and_navigate(username, password):
    """Log into the Banner page, navigate to the course schedule, and extract course details."""
    # Set up Chrome options for headless mode
    chrome_options = webdriver.ChromeOptions()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--window-size=1920,1080")
    
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)
    
    try:
        # Open the LMS page
        driver.get(BANNER_URL)

        # Click the login link
        login_link = WebDriverWait(driver, 15).until(EC.element_to_be_clickable((By.LINK_TEXT, "Log in")))
        login_link.click()

        # Wait for the login form and submit credentials
        WebDriverWait(driver, 15).until(EC.visibility_of_element_located((By.NAME, "j_username")))

        driver.find_element(By.NAME, "j_username").send_keys(username)
        driver.find_element(By.NAME, "j_password").send_keys(password)
        driver.find_element(By.NAME, "_eventId_proceed").click()

        driver.get(PROFILE_URL)
        # Navigate to the course schedule page
        driver.get(COURSE_SCHEDULE_URL)

        # Wait for the course schedule table to load
        WebDriverWait(driver, 15).until(EC.visibility_of_element_located((By.CLASS_NAME, "datadisplaytable")))

        # Extract course details
        courses = extract_course_details(driver)

        return courses
    
    except Exception as e:
        print(f"An error occurred: {e}")
        return []
    
    finally:
        driver.quit()

@app.route('/courses', methods=['GET'])
def get_courses():
    try:
        username, password = load_credentials("editme.json")
        courses = login_and_navigate(username, password)
        return jsonify(courses), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

def run_server():
    app.run(debug=True, host='0.0.0.0', use_reloader=False, port=5001)

if __name__ == '__main__':
    # Run the server in a separate thread
    server_thread = Thread(target=run_server)
    server_thread.start()
    time.sleep(2)

    # Client-side code to fetch course data
    try:
        response = requests.get('http://127.0.0.1:5001/courses')
        response.raise_for_status()  # Raise error if response code is not 200

        # Attempt to parse JSON response
        courses_data = response.json()
        print("Courses data:", courses_data)

    except requests.exceptions.RequestException as e:
        print('Error fetching course data:', e)

    except ValueError:
        print("Error: The server response is not valid JSON. Here’s the raw response content:", response.text)
