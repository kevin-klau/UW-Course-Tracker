from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
import json

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
#for title in titles:
#    print(title.text)

# Input it into a list of objects
class Course:
    def __init__(self, code, name, ratings, useful, easy, liked):
        self.code = code
        self.name = name
        self.ratings = ratings
        self.useful = useful
        self.easy = easy
        self.liked = liked

class CourseEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Course):
            return {"code": obj.code, "name": obj.name, "ratings": obj.ratings, "useful": obj.useful, "easy": obj.easy, "liked": obj.liked}
        return json.JSONEncoder.default(self, obj)

data = []
for i in range(0, len(titles), 6):
    newData = Course(titles[i].text, titles[i+1].text, titles[i+2].text, titles[i+3].text, titles[i+4].text, titles[i+5].text)
    data.append(newData)


with open('datafull.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=4, cls=CourseEncoder)

data = []


# Quit the webdriver
driver.quit()




