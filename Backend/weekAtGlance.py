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
from PIL import Image
import io


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

def login_and_navigate(username, password):
    """Log into the Banner page, navigate to the course schedule, and capture a full-page screenshot."""
    # Set up Chrome options for headless mode with full-page screenshots
    chrome_options = webdriver.ChromeOptions()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--window-size=1920,1080")  # Set an initial viewport size
    chrome_options.add_argument("--start-maximized")  # Optionally, maximize window size
    
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)
    
    try:
        # Open the LMS page
        driver.get(BANNER_URL)
        print("Opened Self-service page.")

        # Click the login link
        login_link = WebDriverWait(driver, 15).until(EC.element_to_be_clickable((By.LINK_TEXT, "Log in")))
        login_link.click()
        print("Clicked the 'Log in' link.")

        # Wait for the login form and submit credentials
        WebDriverWait(driver, 15).until(EC.visibility_of_element_located((By.NAME, "j_username")))
        driver.find_element(By.NAME, "j_username").send_keys(username)
        driver.find_element(By.NAME, "j_password").send_keys(password)
        driver.find_element(By.NAME, "_eventId_proceed").click()
        print("Logged in successfully.")

        driver.get(PROFILE_URL)
        # Navigate to the course schedule page
        driver.get(COURSE_SCHEDULE_URL)
        print("Navigated to Course Schedule Page")

        # Wait for the course schedule table to load
        WebDriverWait(driver, 15).until(
            EC.visibility_of_element_located((By.CLASS_NAME, "datadisplaytable"))
        )
        print("Located course schedule element.")

        # Capture full-page screenshot
        screenshot = driver.get_screenshot_as_png()
        full_page_image = Image.open(io.BytesIO(screenshot))

        # Save the full-page screenshot as "course_schedule.png"
        full_page_image.save("course_schedule.png", "PNG")
        print("Full-page screenshot saved as 'course_schedule.png'.")
        
        return "Full-page screenshot captured and saved as 'course_schedule.png'."
    
    except Exception as e:
        print(f"An error occurred: {e}")
        return str(e)
    
    finally:
        driver.quit()



@app.route('/profile', methods=['GET'])
def get_profile():
    """API endpoint to fetch and capture the course schedule page screenshot."""
    try:
        username, password = load_credentials("editme.json")
        print("Loaded credentials.")
        
        result = login_and_navigate(username, password)
        print(result)
        
        return jsonify({"message": result}), 200

    except Exception as e:
        print(f"Error in get_profile: {e}")
        return jsonify({"error": str(e)}), 500

def run_server():
    app.run(debug=True, host='0.0.0.0', use_reloader=False, port=5001)

if __name__ == '__main__':
    # Run the server in a separate thread
    server_thread = Thread(target=run_server)
    server_thread.start()
    time.sleep(2)

    # Client-side code to fetch profile data
    try:
        response = requests.get('http://127.0.0.1:5001/profile')
        response.raise_for_status()  # Raise error if response code is not 200

        # Attempt to parse JSON response
        profile_data = response.json()
        print("Profile data:", profile_data)

    except requests.exceptions.RequestException as e:
        print('Error fetching profile:', e)

    except ValueError:
        print("Error: The server response is not valid JSON. Here’s the raw response content:", response.text)
