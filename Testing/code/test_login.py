import time
import accessabilities
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException
import conftest


def to_login_page():
    driver = conftest.driver()
    try:
        driver.find_element(By.ID, accessabilities.sign_in_button_id).click()
    except NoSuchElementException:
        pass

    try:
        driver.find_element(By.ID, accessabilities.sign_in_email_textbox_id).send_keys(accessabilities.username)
    except NoSuchElementException:
        pass

    try:
        driver.find_element(By.ID, accessabilities.sign_in_next_button).click()
    except NoSuchElementException:
        pass


def test_empty_username():
    driver = conftest.driver()
    try:
        driver.find_element(By.ID, accessabilities.sign_in_button_id).click()
    except NoSuchElementException:
        pass

    try:
        driver.find_element(By.ID, accessabilities.sign_in_email_textbox_id).send_keys("")
    except NoSuchElementException:
        pass

    try:
        driver.find_element(By.ID, accessabilities.sign_in_next_button).click()
    except NoSuchElementException:
        pass

    test = False

    try:
        test = (driver.find_element(By.CSS_SELECTOR, accessabilities.empty_username_error).is_displayed())
    except NoSuchElementException:
        pass

    if test:
        print('Test Successful')
    else:
        print('Test Failed')

    conftest.teardown(driver)


def test_empty_password():
    driver = conftest.driver()

    try:
        driver.find_element(By.ID, accessabilities.sign_in_button_id).click()
    except NoSuchElementException:
        pass

    try:
        driver.find_element(By.ID, accessabilities.sign_in_email_textbox_id).send_keys(accessabilities.username)
    except NoSuchElementException:
        pass

    try:
        driver.find_element(By.ID, accessabilities.sign_in_next_button).click()
    except NoSuchElementException:
        pass

    try:
        driver.find_element(By.ID, accessabilities.sign_in_password_textbox_id).send_keys("")
    except NoSuchElementException:
        pass

    try:
        driver.find_element(By.ID, accessabilities.sign_in_login_button_id).click()
    except NoSuchElementException:
        pass

    test = False

    try:
        test = (driver.find_element(By.CSS_SELECTOR, accessabilities.empty_password_error).is_displayed())
    except NoSuchElementException:
        pass

    if test:
        print('Test Successful')
    else:
        print('Test Failed')

    conftest.teardown(driver)
