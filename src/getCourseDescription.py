from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
import json

def remove(string):
    return string.replace(" ", "")

def find_desc(course):
    course=remove(course).lower()
    # Set up options to run Chrome headless
    options = Options()
    # options.add_argument('--headless')

    # Set up the webdriver
    driver = webdriver.Chrome(options=options)

    # Navigate to the webpage
    url = "https://uwflow.com/course/"+course
    driver.get(url)

    # Wait for the page to finish loading (adjust the time.sleep duration as needed)
    import time
    time.sleep(1)

    # Extract the description of the webpage
    desc = driver.find_element(By.CLASS_NAME, 'sc-pAyMl')
    
    return desc.text
    
    # Quit the webdriver
    driver.quit()
