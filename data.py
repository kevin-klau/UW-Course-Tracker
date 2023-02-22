from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By

# Set up options to run Chrome headless
options = Options()
#options.add_argument('--headless')

# Set up the webdriver
driver = webdriver.Chrome(options=options)

# Navigate to the webpage
url = "https://uwflow.com/explore"
driver.get(url)

# Wait for the page to finish loading (adjust the time.sleep duration as needed)
import time
time.sleep(1)

# Scrolling down to the bottom of the page to get all 8000 courses

while True:
    
    # Get current scroll height
    last_height = driver.execute_script("return document.body.scrollHeight")

    # Scroll down to the bottom
    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")

    # Wait for new content to load
    time.sleep(0.65)

    # Calculate new scroll height and compare with last scroll height
    new_height = driver.execute_script("return document.body.scrollHeight")
    if new_height == last_height:
        break
    last_height = new_height

# Extract the title of the webpage
titles = driver.find_elements(By.CLASS_NAME, 'sc-pQdCa')

# Extract the title and rating of each card
for title in titles:
    print(title.text)

# Quit the webdriver
driver.quit()
