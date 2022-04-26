import accessabilities
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException
import conftest
import time


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
        test = (driver.find_element(By.ID, accessabilities.empty_username_error).is_displayed())
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
        test = (driver.find_element(By.ID, accessabilities.empty_password_error).is_displayed())
    except NoSuchElementException:
        pass

    if test:
        print('Test Successful')
    else:
        print('Test Failed')

    conftest.teardown(driver)


def test_incorrect_password():
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
        driver.find_element(By.ID, accessabilities.sign_in_password_textbox_id).send_keys(
            accessabilities.sign_in_invalid_password)
    except NoSuchElementException:
        pass

    try:
        driver.find_element(By.ID, accessabilities.sign_in_login_button_id).click()
    except NoSuchElementException:
        pass

    test = False

    try:
        test = (driver.find_element(By.ID, accessabilities.sign_in_invalid_password_error).is_displayed())
    except NoSuchElementException:
        pass

    if test:
        print('Test Successful')
    else:
        print('Test Failed')

    conftest.teardown(driver)


def test_unregistered_username_signin():
    driver = conftest.driver()
    try:
        driver.find_element(By.ID, accessabilities.sign_in_button_id).click()
    except NoSuchElementException:
        pass

    try:
        driver.find_element(By.ID, accessabilities.sign_in_email_textbox_id).send_keys(accessabilities.sample_username)
    except NoSuchElementException:
        pass

    try:
        driver.find_element(By.ID, accessabilities.sign_in_next_button).click()
    except NoSuchElementException:
        pass

    try:
        driver.find_element(By.ID, accessabilities.sign_in_password_textbox_id)
    except NoSuchElementException:
        print('Test Successful')
        conftest.teardown(driver)
        return
    print('Test Failed')
    conftest.teardown(driver)


def test_unregistered_email_signin():
    driver = conftest.driver()
    try:
        driver.find_element(By.ID, accessabilities.sign_in_button_id).click()
    except NoSuchElementException:
        pass

    try:
        driver.find_element(By.ID, accessabilities.sign_in_email_textbox_id).send_keys(
            accessabilities.sample_email)
    except NoSuchElementException:
        pass

    try:
        driver.find_element(By.ID, accessabilities.sign_in_next_button).click()
    except NoSuchElementException:
        pass

    try:
        driver.find_element(By.ID, accessabilities.sign_in_password_textbox_id)
    except NoSuchElementException:
        print('Test Successful')
        conftest.teardown(driver)
        return
    print('Test Failed')
    conftest.teardown(driver)


# forgot password
def test_unregistered_email_forgot_password():
    driver = conftest.driver()
    try:
        driver.find_element(By.ID, accessabilities.sign_in_button_id).click()
    except NoSuchElementException:
        pass

    try:
        driver.find_element(By.ID, accessabilities.forgot_password_button).click()
    except NoSuchElementException:
        pass

    try:
        driver.find_element(By.ID, accessabilities.forgot_password_textbox_id).send_keys(
            accessabilities.sample_email)
    except NoSuchElementException:
        pass

    try:
        driver.find_element(By.ID, accessabilities.forgot_password_search_button_id).click()
    except NoSuchElementException:
        pass

    test = False

    try:
        test = (driver.find_element(By.ID, accessabilities.user_not_found_error).is_displayed())
    except NoSuchElementException:
        pass

    if test:
        print('Test Successful')
    else:
        print('Test Failed')

    conftest.teardown(driver)


def test_unregistered_username_forgot_password():
    # OPEN START PAGE
    driver = conftest.driver()
    time.sleep(5)
    try:
        driver.find_element(By.ID, accessabilities.sign_in_button_id).click()
    except NoSuchElementException:
        pass

    try:
        driver.find_element(By.XPATH, accessabilities.forgot_password_button).click()
    except NoSuchElementException:
        pass

    try:
        driver.find_element(By.ID, accessabilities.forgot_password_textbox_id).send_keys(
            accessabilities.sample_username)
    except NoSuchElementException:
        pass

    try:
        driver.find_element(By.ID, accessabilities.forgot_password_search_button_id).click()
    except NoSuchElementException:
        pass

    # CHECK THE ERROR MESSAGE
    test = False

    try:
        test = (driver.find_element(By.CSS_SELECTOR, accessabilities.user_not_found_error).is_displayed())
    except NoSuchElementException:
        pass
    print('FORGOT PASSWORD UNREGISTERED USERNAME')

    if test:
        print('Test Successful')
    else:
        print('Test Failed')
    # CLOSE PAGE
    conftest.teardown(driver)
