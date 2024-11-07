import json
from flask import Flask, jsonify
from flask_cors import CORS
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
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
    """Log into the Banner page, navigate to the course schedule, and capture a cropped screenshot."""
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
    
    try:
        # Step 1: Open the LMS page
        driver.get(BANNER_URL)
        print("Opened Self service page.")

        # Step 2: Click the 'Log in' link
        login_link = WebDriverWait(driver, 15).until(EC.element_to_be_clickable((By.LINK_TEXT, "Log in")))
        login_link.click()
        print("Clicked the 'Log in' link.")

        # Step 3: Enter credentials and log in
        WebDriverWait(driver, 15).until(EC.visibility_of_element_located((By.NAME, "j_username")))
        driver.find_element(By.NAME, "j_username").send_keys(username)
        driver.find_element(By.NAME, "j_password").send_keys(password)
        driver.find_element(By.NAME, "_eventId_proceed").click()
        print("Login completed.")

        # Step 4: Navigate to the course schedule page
        driver.get(COURSE_SCHEDULE_URL)
        print("Navigated to Course Schedule Page")

        # Step 5: Locate the course schedule table
        course_schedule_element = WebDriverWait(driver, 15).until(
            EC.visibility_of_element_located((By.CLASS_NAME, "datadisplaytable"))
        )
        print("Course schedule table located.")

        # Step 6: Capture screenshot of the full page
        screenshot = driver.get_screenshot_as_png()
        image = Image.open(io.BytesIO(screenshot))

        # Step 7: Crop to the course schedule section
        location = course_schedule_element.location
        size = course_schedule_element.size
        left = location['x']
        top = location['y']
        right = left + size['width']
        bottom = top + size['height']
        cropped_image = image.crop((left, top, right, bottom))

        # Save the cropped screenshot
        cropped_image.save("course_schedule.png")
        print("Cropped screenshot saved as 'course_schedule.png'.")
        return "Screenshot captured and cropped."
        
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
        result = login_and_navigate(username, password)
        return jsonify({"message": result}), 200

    except Exception as e:
        print(f"Error in get_profile: {e}")
        return jsonify({"error": str(e)}), 500

def run_server():
    app.run(debug=True, host='0.0.0.0', use_reloader=False, port=5001)

if __name__ == '__main__':
    run_server()
