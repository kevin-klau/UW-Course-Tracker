from selenium import webdriver
from selenium.webdriver.chrome.options import Options

# Set up options to run Chrome headless
options = Options()
options.headless = True

# Set up the webdriver
driver = webdriver.Chrome(options=options)

# Navigate to the webpage
url = "https://uwflow.com/course/math136"
driver.get(url)

# Wait for the page to finish loading (adjust the time.sleep duration as needed)
import time
time.sleep(5)

# Extract the title of the webpage
title = driver.title
print(title)

# Quit the webdriver
driver.quit()