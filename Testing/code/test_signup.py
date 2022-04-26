import accessabilities
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.support.ui import Select
import time
import conftest


def test_signup_invalid_email_and_name():
    #OPEN PAGE
    driver = conftest.driver()
    time.sleep(10)

    #SIGN UP BUTTON
    try:
        driver.find_element(By.ID, accessabilities.sign_up_with_email_button_id).click()
    except NoSuchElementException:
        pass
    time.sleep(10)

    # case 1
    #EMPTY NAME AND MAIL
    try:
        driver.find_element(By.ID, accessabilities.signup_name_textbox_id).send_keys("")
    except NoSuchElementException:
        pass

    try:
        driver.find_element(By.ID, accessabilities.signup_email_textbox_id).send_keys("")
    except NoSuchElementException:
        pass

    try:
        driver.find_element(By.ID, accessabilities.signup_next_button_id).click()
    except NoSuchElementException:
        pass

    test = False
    #CHECK THE ERROR MESSGAE
    try:
        test ='Please select an item in the list.' == driver.find_element(By.ID,
                                                                       accessabilities.signup_month_list_id).get_attribute(
        "validationMessage")
    except NoSuchElementException:
        pass

    print('INVALID MAIL AND NAME SIGN UP')

    if test:
        print('Test Successful')
    else:
        print('Test Failed')

    #CLOSE THE SIGN UP TAP
    try:
        driver.find_element(By.CSS_SELECTOR, accessabilities.signup_close_button).click()
    except NoSuchElementException:
        pass

    #CLOSE THE PAGE
    conftest.teardown(driver)
    time.sleep(2)

def test_signup_invalid_email_only():
    #OPEN PAGE
    driver = conftest.driver()
    time.sleep(10)
    #SIGN UP BUTTON
    try:
        driver.find_element(By.ID, accessabilities.sign_up_with_email_button_id).click()
    except NoSuchElementException:
        pass

    #VALID NAME
    try:
        driver.find_element(By.ID, accessabilities.signup_name_textbox_id).send_keys("Yasmeen")
    except NoSuchElementException:
        pass
    #EMPTY MAIL
    try:
        driver.find_element(By.ID, accessabilities.signup_email_textbox_id).send_keys("")
    except NoSuchElementException:
        pass
    #NEXT BUTTON
    try:
        driver.find_element(By.ID, accessabilities.signup_next_button_id).click()
    except NoSuchElementException:
        pass

    test =False
    #CHECK THE ERROR MESSAGE
    try:
        test='Please select an item in the list.' == driver.find_element(By.ID,
                                                                       accessabilities.signup_month_list_id).get_attribute(
        "validationMessage")
    except NoSuchElementException:
        pass

    print('INVALID MAIL AND VALID NAME SIGN UP')

    if test:
        print('Test Successful')
    else:
        print('Test Failed')

    #CLOSE THE SIGN UP TAB
    try:
        driver.find_element(By.CSS_SELECTOR, accessabilities.signup_close_button).click()
    except NoSuchElementException:
        pass
    #CLOSE PAGE
    conftest.teardown(driver)
    time.sleep(2)

def test_signup_invalid_name_only():
    # OPEN PAGE
    driver = conftest.driver()
    time.sleep(10)
    # SIGN UP BUTTON
    try:
        driver.find_element(By.ID, accessabilities.sign_up_with_email_button_id).click()
    except NoSuchElementException:
        pass

    #INVALID NAME
    try:
        driver.find_element(By.ID, accessabilities.signup_name_textbox_id).send_keys("")
    except NoSuchElementException:
        pass

    #VALID MAIL
    try:
        driver.find_element(By.ID, accessabilities.signup_email_textbox_id).send_keys("yasmeen_zaki01@gmail.com")
    except NoSuchElementException:
        pass
    #NEXT BUTTON
    try:
        driver.find_element(By.ID, accessabilities.signup_next_button_id).click()
    except NoSuchElementException:
        pass
    #CHECK THE ERROR MESSAGE
    test=False
    try:
        test='Please select an item in the list.' == driver.find_element(By.ID,
                                                                       accessabilities.signup_month_list_id).get_attribute(
            "validationMessage")
    except NoSuchElementException:
        pass

    print('INVALID NAME AND VALID MAIL SIGN UP')

    if test:
        print('Test Successful')
    else:
        print('Test Failed')

    #CLOSE SIGNUP TAB
    try:
        driver.find_element(By.CSS_SELECTOR, accessabilities.signup_close_button).click()
    except NoSuchElementException:
        pass

    #CLOSE PAGE
    conftest.teardown(driver)
    time.sleep(2)

def test_signup_invalid_date_only():
    # OPEN PAGE
    driver = conftest.driver()
    time.sleep(10)
    # SIGN UP BUTTON
    try:
        driver.find_element(By.ID, accessabilities.sign_up_with_email_button_id).click()
    except NoSuchElementException:
        pass

    #VALID NAME
    try:
        driver.find_element(By.ID, accessabilities.signup_name_textbox_id).send_keys("Yasmeen")
    except NoSuchElementException:
        pass
    #VALID MAIL
    try:
        driver.find_element(By.ID, accessabilities.signup_email_textbox_id).send_keys("yasmeen_zaki01@gmail.com")
    except NoSuchElementException:
        pass
    #NEXT BUTTON
    try:
        driver.find_element(By.ID, accessabilities.signup_next_button_id).click()
    except NoSuchElementException:
        pass

    test=False
    try:
        test='Please select an item in the list.' == driver.find_element(By.ID,
                                                                       accessabilities.signup_month_list_id).get_attribute(
            "validationMessage")
    except NoSuchElementException:
        pass

    print('INVALID DATE SIGN UP')

    if test:
        print('Test Successful')
    else:
        print('Test Failed')

    #CLOSE SIGNUP TAB
    try:
        driver.find_element(By.CSS_SELECTOR, accessabilities.signup_close_button).click()
    except NoSuchElementException:
        pass

    #CLOSE PAGE
    conftest.teardown(driver)
    time.sleep(2)

def test_signup_valid_date_only():
    # OPEN PAGE
    driver = conftest.driver()
    time.sleep(10)
    # SIGN UP BUTTON
    try:
        driver.find_element(By.ID, accessabilities.sign_up_with_email_button_id).click()
    except NoSuchElementException:
        pass

    #INVALID NAME
    try:
        driver.find_element(By.ID, accessabilities.signup_name_textbox_id).send_keys("")
    except NoSuchElementException:
        pass
    #INVALID MAIL
    try:
        driver.find_element(By.ID, accessabilities.signup_email_textbox_id).send_keys("")
    except NoSuchElementException:
        pass

    #VALID DATE
    try:
        select = Select(driver.find_element(By.ID, accessabilities.signup_month_list_id))
    except NoSuchElementException:
        pass

    select.select_by_visible_text('August')

    try:
        select = Select(driver.find_element(By.ID, accessabilities.signup_day_list_id))
    except NoSuchElementException:
        pass

    select.select_by_visible_text('21')

    try:
        select = Select(driver.find_element(By.ID, accessabilities.signup_year_list_id))
    except NoSuchElementException:
        pass

    select.select_by_visible_text('2001')
    #NEXT BUTTON
    try:
        driver.find_element(By.ID, accessabilities.signup_next_button_id).click()
    except NoSuchElementException:
        pass

    #CHECK THE ERROR MESSAGE
    test=False
    try:
        test= driver.find_element(By.XPATH,
                               accessabilities.signup_name_error) and driver.find_element(By.XPATH, accessabilities.signup_email_error)
    except NoSuchElementException:
        pass

    print('VALID DATE SIGN UP WITH INVALID DATA')
    if test:
        print('Test Successful')
    else:
        print('Test Failed')

    # CLOSE SIGNUP TAB
    try:
        driver.find_element(By.CSS_SELECTOR, accessabilities.signup_close_button).click()
    except NoSuchElementException:
        pass

    # CLOSE PAGE
    conftest.teardown(driver)
    time.sleep(2)

def test_signup_valid_date_and_name():
    # OPEN PAGE
    driver = conftest.driver()
    time.sleep(10)
    # SIGN UP BUTTON
    try:
        driver.find_element(By.ID, accessabilities.sign_up_with_email_button_id).click()
    except NoSuchElementException:
        pass

    #VALID NAME
    try:
        driver.find_element(By.ID, accessabilities.signup_name_textbox_id).send_keys("Yasmeen")
    except NoSuchElementException:
        pass
    #INVALID MAIL
    try:
        driver.find_element(By.ID, accessabilities.signup_email_textbox_id).send_keys("")
    except NoSuchElementException:
        pass
    #VALID MONTH
    try:
        select = Select(driver.find_element(By.ID, accessabilities.signup_month_list_id))
    except NoSuchElementException:
        pass

    select.select_by_visible_text('August')

    try:
        select = Select(driver.find_element(By.ID, accessabilities.signup_day_list_id))
    except NoSuchElementException:
        pass

    select.select_by_visible_text('21')

    try:
        select = Select(driver.find_element(By.ID, accessabilities.signup_year_list_id))
    except NoSuchElementException:
        pass

    select.select_by_visible_text('2001')
    #NEXT BUTTON
    try:
        driver.find_element(By.ID, accessabilities.signup_next_button_id).click()
    except NoSuchElementException:
        pass
    #CHECK THE ERROR MESSAGE
    test=False
    try:
        test=driver.find_element(By.XPATH, accessabilities.signup_email_error).is_displayed()
    except NoSuchElementException:
        pass

    print('VALID DATE AND NAME SIGN UP')
    if test:
        print('Test Successful')
    else:
        print('Test Failed')

    # CLOSE SIGNUP TAB
    try:
        driver.find_element(By.CSS_SELECTOR, accessabilities.signup_close_button).click()
    except NoSuchElementException:
        pass

    # CLOSE PAGE
    conftest.teardown(driver)
    time.sleep(2)

def test_signup_valid_date_and_email():
    # OPEN PAGE
    driver = conftest.driver()
    time.sleep(10)
    # SIGN UP BUTTON
    try:
        driver.find_element(By.ID, accessabilities.sign_up_with_email_button_id).click()
    except NoSuchElementException:
        pass

    #EMPTY NAME
    try:
        driver.find_element(By.ID, accessabilities.signup_name_textbox_id).send_keys("")
    except NoSuchElementException:
        pass
    #VALID MAIL
    try:
        driver.find_element(By.ID, accessabilities.signup_email_textbox_id).send_keys("yasmeen_zaki01@gmail")
    except NoSuchElementException:
        pass
    #VALID DATE
    try:
        select = Select(driver.find_element(By.ID, accessabilities.signup_month_list_id))
    except NoSuchElementException:
        pass

    select.select_by_visible_text('August')

    try:
        select = Select(driver.find_element(By.ID, accessabilities.signup_day_list_id))
    except NoSuchElementException:
        pass

    select.select_by_visible_text('21')

    try:
        select = Select(driver.find_element(By.ID, accessabilities.signup_year_list_id))
    except NoSuchElementException:
        pass

    select.select_by_visible_text('2001')
    #NEXT BUTTON
    try:
        driver.find_element(By.ID, accessabilities.signup_next_button_id).click()
    except NoSuchElementException:
        pass

    #CHECK THE ERROR MESSGAE
    test= False
    try:
        test=driver.find_element(
        By.XPATH, accessabilities.signup_name_error).is_displayed()
    except NoSuchElementException:
        pass

    print('VALID DATE AND MAIL SIGN UP')
    if test:
        print('Test Successful')
    else:
        print('Test Failed')

    # CLOSE SIGNUP TAB
    try:
        driver.find_element(By.CSS_SELECTOR, accessabilities.signup_close_button).click()
    except NoSuchElementException:
        pass

    # CLOSE PAGE
    conftest.teardown(driver)
    time.sleep(2)
