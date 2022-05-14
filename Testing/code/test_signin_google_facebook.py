import time
import accessabilities
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException
import conftest


def test_signup_google():
    # OPEN START PAGE
    driver = conftest.start_driver()
    time.sleep(10)
    # SIGN IN WITH GOOGLE BUTTON
    try:
        driver.find_element(By.XPATH, accessabilities.sign_in_with_google_button).click()
    except NoSuchElementException:
        pass
    # VALID GOOGLE DATA
    try:
        driver.find_element(By.XPATH, accessabilities.google_mail).click()
        driver.find_element(By.XPATH, accessabilities.google_mail).send_keys(accessabilities.testing_google_mail)
    except NoSuchElementException:
        pass
    # GOOGLE MAIL NEXT
    try:
        driver.find_element(By.XPATH, accessabilities.google_mail_next_button).click()
    except NoSuchElementException:
        pass
    # GOOGLE PASSWORD
    try:
        driver.find_element(By.XPATH, accessabilities.google_password).click()
        driver.find_element(By.XPATH, accessabilities.google_password).send_keys(
            accessabilities.testing_google_password)
    except NoSuchElementException:
        pass
    # GOOGLE PASSWORD NEXT
    try:
        driver.find_element(By.XPATH, accessabilities.google_password_next_button).click()
    except NoSuchElementException:
        pass
    # CHECK HOME PAGE RESPONSE
    try:
        assert (driver.find_element(By.XPATH, accessabilities.home_page).is_displayed())
    except NoSuchElementException:
        pass
    # CLOSE PAGE
    conftest.end_driver(driver)


def test_signup_facebook():
    # OPEN START PAGE
    driver = conftest.start_driver()
    time.sleep(10)
    # SIGN UP WITH FACEBOOK BUTTON
    try:
        driver.find_element(By.XPATH, accessabilities.sign_up_with_facebook_button).click()
    except NoSuchElementException:
        pass
    # VALID FACEBOOK MAIL
    try:
        driver.find_element(By.ID, accessabilities.facebook_mail).click()
        driver.find_element(By.ID, accessabilities.facebook_mail).send_keys(accessabilities.testing_google_mail)
    except NoSuchElementException:
        pass

    # VALID FACEBOOK PASSWORD
    try:
        driver.find_element(By.ID, accessabilities.facebook_password).click()
        driver.find_element(By.ID, accessabilities.facebook_password).send_keys(accessabilities.testing_google_password)
    except NoSuchElementException:
        pass
    # FACEBOOK LOGIN NEXT
    try:
        driver.find_element(By.XPATH, accessabilities.facebook_login).click()
    except NoSuchElementException:
        pass
    # CHECK HOME PAGE RESPONSE
    try:
        assert (driver.find_element(By.XPATH, accessabilities.home_page).is_displayed())
    except NoSuchElementException:
        pass

    # CLOSE PAGE
    conftest.end_driver(driver)
