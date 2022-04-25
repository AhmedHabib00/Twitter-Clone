import time
import accessabilities
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException
import conftest


def test_wrong_username():
    # OPEN START PAGE
    driver = conftest.driver()
    time.sleep(5)
    # SIGN IN BUTTON
    try:
        driver.find_element(By.ID, accessabilities.sign_in_button_id).click()
    except NoSuchElementException:
        pass
    # EMPTY MAIL
    try:
        driver.find_element(By.ID, accessabilities.sign_in_email_textbox_id).send_keys('#@ABB!!')
    except NoSuchElementException:
        pass
    # NEXT BUTTON
    try:
        driver.find_element(By.ID, accessabilities.sign_in_next_button).click()
    except NoSuchElementException:
        pass
    # CHECK THE ERROR MESSAGE
    test = False

    try:
        test = (driver.find_element(By.CSS_SELECTOR, accessabilities.empty_username_error).is_displayed())
    except NoSuchElementException:
        pass
    print("WRONG MAIL LOGIN")
    if test:
        print('Test Successful')
    else:
        print('Test Failed')
    # CLOSE PAGE
    conftest.teardown(driver)

def test_wrong_password():
    #OPEN START PAGE
    driver = conftest.driver()
    time.sleep(5)
    #SIGN IN BUTTON
    try:
        driver.find_element(By.ID, accessabilities.sign_in_button_id).click()
    except NoSuchElementException:
        pass
    #VALID MAIL
    try:
        driver.find_element(By.ID, accessabilities.sign_in_email_textbox_id).send_keys(accessabilities.username)
    except NoSuchElementException:
        pass
    #NEXT BUTTON
    try:
        driver.find_element(By.ID, accessabilities.sign_in_next_button).click()
    except NoSuchElementException:
        pass
    #EMPTY PASSWORD
    try:
        driver.find_element(By.ID, accessabilities.sign_in_password_textbox_id).send_keys("@@@1")
    except NoSuchElementException:
        pass
    #LOG IN BUTTON
    try:
        driver.find_element(By.ID, accessabilities.sign_in_login_button_id).click()
    except NoSuchElementException:
        pass
    #CHECK THE ERROR MESSAGE
    test = False

    try:
        test = (driver.find_element(By.XPATH, accessabilities.invalid_password_error).is_displayed())
    except NoSuchElementException:
        pass
    print('WRONG PASSWORD LOGIN')
    if test:
        print('Test Successful')
    else:
        print('Test Failed')
    #CLOSE PAGE
    conftest.teardown(driver)

def test_empty_username():
    #OPEN START PAGE
    driver = conftest.driver()
    time.sleep(5)
    #SIGN IN BUTTON
    try:
        driver.find_element(By.ID, accessabilities.sign_in_button_id).click()
    except NoSuchElementException:
        pass
    #EMPTY MAIL
    try:
        driver.find_element(By.ID, accessabilities.sign_in_email_textbox_id).send_keys("")
    except NoSuchElementException:
        pass
    #NEXT BUTTON
    try:
        driver.find_element(By.ID, accessabilities.sign_in_next_button).click()
    except NoSuchElementException:
        pass
    #CHECK THE ERROR MESSAGE
    test = False

    try:
        test = (driver.find_element(By.CSS_SELECTOR, accessabilities.empty_username_error).is_displayed())
    except NoSuchElementException:
        pass
    print("EMPTY MAIL LOGIN")
    if test:
        print('Test Successful')
    else:
        print('Test Failed')
    #CLOSE PAGE
    conftest.teardown(driver)


def test_empty_password():
    #OPEN START PAGE
    driver = conftest.driver()
    time.sleep(5)
    #SIGN IN BUTTON
    try:
        driver.find_element(By.ID, accessabilities.sign_in_button_id).click()
    except NoSuchElementException:
        pass
    #VALID MAIL
    try:
        driver.find_element(By.ID, accessabilities.sign_in_email_textbox_id).send_keys(accessabilities.username)
    except NoSuchElementException:
        pass
    #NEXT BUTTON
    try:
        driver.find_element(By.ID, accessabilities.sign_in_next_button).click()
    except NoSuchElementException:
        pass
    #EMPTY PASSWORD
    try:
        driver.find_element(By.ID, accessabilities.sign_in_password_textbox_id).send_keys("")
    except NoSuchElementException:
        pass
    #LOG IN BUTTON
    try:
        driver.find_element(By.ID, accessabilities.sign_in_login_button_id).click()
    except NoSuchElementException:
        pass
    #CHECK THE ERROR MESSAGE
    test = False

    try:
        test = (driver.find_element(By.CSS_SELECTOR, accessabilities.empty_password_error).is_displayed())
    except NoSuchElementException:
        pass
    print('EMPTY PASSWORD LOGIN')
    if test:
        print('Test Successful')
    else:
        print('Test Failed')
    #CLOSE PAGE
    conftest.teardown(driver)