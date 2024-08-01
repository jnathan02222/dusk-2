from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.remote.webelement import WebElement
from selenium.common.exceptions import NoSuchElementException, TimeoutException, ElementNotInteractableException
from selenium.webdriver.chrome.options import Options

import argparse
from dotenv import load_dotenv

import os
import time
import json
from pathlib import WindowsPath
absPathFromFile = str(WindowsPath(__file__).parent.absolute())

HOME_URL = 'https://developer.spotify.com'
DASHBOARD_URL = 'https://developer.spotify.com/dashboard/3396197e1137496bb77ceaa11b0d4a50/users'

#Function to wait for presence of element before returning it
def search_for_element(browser : webdriver.Chrome, by : str, value : str, timeout : int = 10) -> WebElement:
    try:   
        WebDriverWait(browser, timeout).until(EC.presence_of_element_located((by, value)), f"Could not find {value} after {timeout} seconds.")
        return browser.find_element(by, value)
    except TimeoutException:
        raise TimeoutException(f"Unable to find element {value} by type {by} after {timeout} seconds.")
    except NoSuchElementException:
        raise NoSuchElementException(f"Unable to find element {value} by type {by}.")

#Arguments
parser = argparse.ArgumentParser()
parser.add_argument('-n', '--name')
parser.add_argument('-e', '--email')
args = parser.parse_args()

load_dotenv()
username = os.getenv("SPOTIFY_USERNAME")
password = os.getenv("SPOTIFY_PASSWORD")

if(args.name == None or args.email == None):
    raise ValueError("Must run script with name and email arguments.")

#Begin session and load cookies\
options = Options()
#options.add_argument("--headless=new")
browser :  webdriver.Chrome
browser = webdriver.Chrome(options=options)
browser.maximize_window()
browser.get(HOME_URL) #Must be at this domain to add cookies
try:
    with open(absPathFromFile+"\\cookies.json", "r") as f:
        try:
            data = json.load(f)
            for cookie in data:
                browser.add_cookie(cookie)
        except json.JSONDecodeError:
            pass
except FileNotFoundError:
    pass

#If redirected from this link, we will have to sign in first
browser.get(DASHBOARD_URL)
try:
    #Login
    login_button = search_for_element(browser, By.CLASS_NAME, 'Button-sc-1dqy6lx-0', 3)  
    login_button.click()
    username_box = search_for_element(browser, By.ID, 'login-username')
    username_box.send_keys(username)
    password_box = search_for_element(browser, By.ID, 'login-password')
    password_box.send_keys(password)
    login_submit = search_for_element(browser, By.CLASS_NAME, 'ButtonInner-sc-14ud5tc-0')
    login_submit.click()

    #Wait for login
    timeout = 3
    start = time.time()
    while(True):
        if(time.time()-start > timeout):
            raise TimeoutError(f"Failed to log in after {timeout} seconds.")
        if("Home" in browser.title):
            break 
    browser.get(DASHBOARD_URL)

except TimeoutException:
    pass
except ElementNotInteractableException:
    pass

#Delete user if necessary
try:
    search_for_element(browser, By.ID, 'name', 3)
except TimeoutException:
    table_elem = search_for_element(browser, By.CLASS_NAME, "sc-3bd49785-0")
    options_button = search_for_element(table_elem, By.CLASS_NAME, "PopoverTrigger__PopoverTriggerContainer-sc-yux5vv-0")
    options_button.click()
    remove_button = search_for_element(browser, By.CLASS_NAME, "Link-sc-1v366a6-0")
    remove_button.click()

#Add user
name_box = search_for_element(browser, By.ID, 'name')
name_box.send_keys(args.name)
email_box = search_for_element(browser, By.ID, 'email')
email_box.send_keys(args.email)
add_button = search_for_element(browser, By.CLASS_NAME, "ButtonInner-sc-14ud5tc-0")
add_button.click()

"""
#Store users (wait 1 second for page to update)
time.sleep(1)
users = {}
table = BeautifulSoup(browser.page_source, 'html.parser').find_all("tr")[1:]
for row in table:
    cols = row.findChildren("td")
    users[cols[1].findChildren("p")[0].string] = cols[2].string

with open(absPathFromFile+"\\users.json", "w") as f:
    json.dump(users, f)
"""

#Update cookies
with open(absPathFromFile+"\\cookies.json", "w") as f:
    cookies = []
    for cookie in browser.get_cookies():
        if(cookie["domain"] != "developer.spotify.com"): #Unnecessary cookie that cannot be added
            cookies.append(cookie)

    json.dump(cookies, f)

print("OKAY")