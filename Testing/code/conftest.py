from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.common.by import By
import accessabilities


def start_driver():
    # initializing webdriver
    caps = DesiredCapabilities().CHROME
    caps["pageLoadStrategy"] = "none"
    s = Service(accessabilities.chrome_driver)
    chrome_options = Options()
    chrome_options.add_argument("--disable-notifications")
    chrome_options.add_experimental_option('excludeSwitches', ['enable-logging'])
    # chrome_options.headless = True
    driver = webdriver.Chrome(service=s, options=chrome_options, desired_capabilities=caps)
    driver.implicitly_wait(20)
    driver.maximize_window()
    #driver.get('http://localhost:3000/')
    driver.get('http://habibs.me/')
    return driver


def sign_in():
    driver = start_driver()
    # LOGIN
    try:
        driver.find_element(By.ID, accessabilities.sign_in_button_id).click()
    except NoSuchElementException:
        pass

    try:
        driver.find_element(By.ID, accessabilities.sign_in_email_textbox_id).send_keys(
            accessabilities.username)
    except NoSuchElementException:
        pass

    try:
        driver.find_element(By.ID, accessabilities.sign_in_next_button).click()
    except NoSuchElementException:
        pass

    try:
        driver.find_element(By.ID, accessabilities.sign_in_password_textbox_id).send_keys(
            accessabilities.password)
    except NoSuchElementException:
        pass

    try:
        driver.find_element(By.ID, accessabilities.sign_in_login_button_id).click()
    except NoSuchElementException:
        pass
    return driver


def end_driver(driver):
    driver.quit()
