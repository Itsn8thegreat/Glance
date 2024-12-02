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


# Define the URL of the LMS login page and the upcoming events page
LMS_URL = "https://lms.manhattan.edu/"
UPCOMING_EVENTS_URL = "https://lms.manhattan.edu/calendar/view.php?view=upcoming"


def load_credentials(file_path):
   """Load username and password from the specified JSON file."""
   with open(file_path) as f:
       credentials = json.load(f)
   return credentials['username'], credentials['password']


def login_and_get_session(username, password):
   """Use Selenium to log in and return the upcoming events page source."""
   driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))


   try:
       # Step 1: Open the LMS page
       driver.get(LMS_URL)
       print("Opened LMS page.")


       # Step 2: Wait for the login link to be clickable
       login_link = WebDriverWait(driver, 15).until(EC.element_to_be_clickable((By.LINK_TEXT, "Log in")))
       login_link.click()
       print("Clicked the 'Log in' link.")


       # Step 3: Wait for the login form to be present and visible
       WebDriverWait(driver, 15).until(EC.visibility_of_element_located((By.NAME, "j_username")))
       print("Login form is present.")


       # Step 4: Enter credentials into the login form
       driver.find_element(By.NAME, "j_username").send_keys(username)
       driver.find_element(By.NAME, "j_password").send_keys(password)


       # Step 5: Click the login button
       login_button = driver.find_element(By.NAME, "_eventId_proceed")
       login_button.click()
       print("Clicked the login button.")


       # Step 6: Wait for the login to complete
       WebDriverWait(driver, 15).until(EC.url_changes(LMS_URL))
       print("Login completed.")


       # Step 7: Navigate directly to the upcoming events page
       driver.get(UPCOMING_EVENTS_URL)
       print("Navigated to Upcoming Events page.")


       # Step 8: Wait for the upcoming events page to load
       WebDriverWait(driver, 15).until(EC.visibility_of_element_located((By.CLASS_NAME, "event")))
       print("Upcoming events page loaded.")


       # Return the page source of the upcoming events page
       return driver.page_source


   except Exception as e:
       print(f"An error occurred: {e}")
       raise


   finally:
       driver.quit()  # Ensure driver is closed in any case


@app.route('/assignments', methods=['GET'])
def get_assignments():
   """API endpoint to fetch assignments."""
   try:
       username, password = load_credentials("editme.json")
       assignments_page_source = login_and_get_session(username, password)
       print("Successfully logged in and retrieved page source.")


       # Parse the assignments from the page source
       soup = BeautifulSoup(assignments_page_source, 'html.parser')
       assignments = []
       events = soup.find_all('div', class_='event')


       for i, event in enumerate(events):
           print(f"Processing event {i + 1}")


           try:
               # Extract the title of the assignment/event
               title = event.find('h3', class_='name').get_text(strip=True) if event.find('h3', class_='name') else "No title found"
               print(f"Title: {title}")


               # Extract the due date and link
               date_div = event.find('div', class_='col-11')
               if date_div:
                   due_date = date_div.get_text(strip=True)
                   link = date_div.find('a', href=True)['href'] if date_div.find('a', href=True) else "No link found"
               else:
                   due_date = "No date found"
                   link = "No link found"
               print(f"Due Date: {due_date}, Link: {link}")


               # Extract the course title specifically
               course_icon = event.find('i', class_='fa-graduation-cap')  # Locate the icon first
               if course_icon:
                   # Get the next 'col-11' div containing course info
                   course_div = course_icon.find_next('div', class_='col-11')
                   if course_div:
                       course_title = course_div.find('a').get_text(strip=True) if course_div.find('a') else "No course title found"
                   else:
                       course_title = "No course title found"
               else:
                   course_title = "No course title found"


               print(f"Course Title: {course_title}")


               # Append assignment details to the list
               assignments.append({
                   'title': title,
                   'due_date': due_date,
                   'link': link,
                   'course': course_title
               })
          


           except AttributeError as e:
               print(f"Error processing event {i + 1}: {e}")
               continue  # Skip events that don’t match the expected structure


       if not assignments:
           return jsonify({"error": "No assignments found"}), 404


       with open("assignments.json", "w") as json_file:
           json.dump(assignments, json_file, indent=4)
           print("Assignments data saved to assignments.json")
       return jsonify(assignments), 200


   except Exception as e:
       print(f"Error in get_assignments: {e}")
       return jsonify({"error": str(e)}), 500


def run_server():
   app.run(debug=True, host='0.0.0.0', use_reloader=False, port=5000)


if __name__ == '__main__':
   server_thread = Thread(target=run_server)
   server_thread.start()
   time.sleep(2)
   try:
       response = requests.get('http://127.0.0.1:5000/assignments')
       print("Assignments data:", response.json())
   except requests.exceptions.RequestException as e:
       print('Error fetching assignments:', e)