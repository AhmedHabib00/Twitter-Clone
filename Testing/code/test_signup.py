import accessabilities
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.support.ui import Select
from conftest import driver
import time


def test_invalid_signup_with_email():
    driver.get('http://habibsw-env-1.eba-rktzmmab.us-east-1.elasticbeanstalk.com')
    time.sleep(10)

    try:
        driver.find_element(By.ID, accessabilities.sign_up_with_email_button_id).click()
    except NoSuchElementException:
        pass
    time.sleep(10)

    # case 1
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

    assert 'Please select an item in the list.' == driver.find_element(By.ID,
                                                                       accessabilities.signup_month_list_id).get_attribute(
        "validationMessage")

    # end of case 1

    try:
        driver.find_element(By.CSS_SELECTOR, accessabilities.signup_close_button).click()
    except NoSuchElementException:
        pass

    time.sleep(10)

    try:
        driver.find_element(By.ID, accessabilities.sign_up_with_email_button_id).click()
    except NoSuchElementException:
        pass

    # case 2
    try:
        driver.find_element(By.ID, accessabilities.signup_name_textbox_id).send_keys("Yasmeen")
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

    assert 'Please select an item in the list.' == driver.find_element(By.ID,
                                                                       accessabilities.signup_month_list_id).get_attribute(
        "validationMessage")

    # end of case 2

    try:
        driver.find_element(By.CSS_SELECTOR, accessabilities.signup_close_button).click()
    except NoSuchElementException:
        pass

    time.sleep(10)

    try:
        driver.find_element(By.ID, accessabilities.sign_up_with_email_button_id).click()
    except NoSuchElementException:
        pass

    # case 3
    try:
        driver.find_element(By.ID, accessabilities.signup_name_textbox_id).send_keys("")
    except NoSuchElementException:
        pass

    try:
        driver.find_element(By.ID, accessabilities.signup_email_textbox_id).send_keys("yasmeen_zaki01@gmail.com")
    except NoSuchElementException:
        pass

    try:
        driver.find_element(By.ID, accessabilities.signup_next_button_id).click()
    except NoSuchElementException:
        pass

    assert 'Please select an item in the list.' == driver.find_element(By.ID,
                                                                       accessabilities.signup_month_list_id).get_attribute(
        "validationMessage")

    # end of case 3

    try:
        driver.find_element(By.CSS_SELECTOR, accessabilities.signup_close_button).click()
    except NoSuchElementException:
        pass

    time.sleep(10)

    try:
        driver.find_element(By.ID, accessabilities.sign_up_with_email_button_id).click()
    except NoSuchElementException:
        pass

    # case 4
    try:
        driver.find_element(By.ID, accessabilities.signup_name_textbox_id).send_keys("Yasmeen")
    except NoSuchElementException:
        pass

    try:
        driver.find_element(By.ID, accessabilities.signup_email_textbox_id).send_keys("yasmeen_zaki01@gmail.com")
    except NoSuchElementException:
        pass

    try:
        driver.find_element(By.ID, accessabilities.signup_next_button_id).click()
    except NoSuchElementException:
        pass

    assert 'Please select an item in the list.' == driver.find_element(By.ID,
                                                                       accessabilities.signup_month_list_id).get_attribute(
        "validationMessage")

    # end of case 4

    try:
        driver.find_element(By.CSS_SELECTOR, accessabilities.signup_close_button).click()
    except NoSuchElementException:
        pass

    time.sleep(10)

    try:
        driver.find_element(By.ID, accessabilities.sign_up_with_email_button_id).click()
    except NoSuchElementException:
        pass

    # case 5
    try:
        driver.find_element(By.ID, accessabilities.signup_name_textbox_id).send_keys("")
    except NoSuchElementException:
        pass

    try:
        driver.find_element(By.ID, accessabilities.signup_email_textbox_id).send_keys("")
    except NoSuchElementException:
        pass

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

    try:
        driver.find_element(By.ID, accessabilities.signup_next_button_id).click()
    except NoSuchElementException:
        pass

    assert driver.find_element(By.CSS_SELECTOR,
                               accessabilities.signup_name_error).is_displayed() and driver.find_element(
        By.CSS_SELECTOR, accessabilities.signup_email_error).is_displayed()

    # end of case 5

    try:
        driver.find_element(By.CSS_SELECTOR, accessabilities.signup_close_button).click()
    except NoSuchElementException:
        pass

    time.sleep(10)

    try:
        driver.find_element(By.ID, accessabilities.sign_up_with_email_button_id).click()
    except NoSuchElementException:
        pass

    # case 6
    try:
        driver.find_element(By.ID, accessabilities.signup_name_textbox_id).send_keys("Yasmeen")
    except NoSuchElementException:
        pass

    try:
        driver.find_element(By.ID, accessabilities.signup_email_textbox_id).send_keys("")
    except NoSuchElementException:
        pass

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

    try:
        driver.find_element(By.ID, accessabilities.signup_next_button_id).click()
    except NoSuchElementException:
        pass

    assert driver.find_element(
        By.CSS_SELECTOR, accessabilities.signup_email_error).is_displayed()

    # end of case 6


    try:
        driver.find_element(By.CSS_SELECTOR, accessabilities.signup_close_button).click()
    except NoSuchElementException:
        pass

    time.sleep(10)

    try:
        driver.find_element(By.ID, accessabilities.sign_up_with_email_button_id).click()
    except NoSuchElementException:
        pass

    # case 7
    try:
        driver.find_element(By.ID, accessabilities.signup_name_textbox_id).send_keys("")
    except NoSuchElementException:
        pass

    try:
        driver.find_element(By.ID, accessabilities.signup_email_textbox_id).send_keys("yasmeen_zaki01@gmail")
    except NoSuchElementException:
        pass

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

    try:
        driver.find_element(By.ID, accessabilities.signup_next_button_id).click()
    except NoSuchElementException:
        pass

    assert driver.find_element(
        By.CSS_SELECTOR, accessabilities.signup_name_error).is_displayed()

    # end of case 7
    try:
        driver.find_element(By.CSS_SELECTOR, accessabilities.signup_close_button).click()
    except NoSuchElementException:
        pass

def test_valid_signup_with_email():
    try:
        driver.find_element(By.ID, accessabilities.sign_up_with_email_button_id).click()
    except NoSuchElementException:
        pass

        # case 8
    try:
        driver.find_element(By.ID, accessabilities.signup_name_textbox_id).send_keys("Yasmeen")
    except NoSuchElementException:
        pass

    try:
        driver.find_element(By.ID, accessabilities.signup_email_textbox_id).send_keys("yasmeen_zaki01@gmail.com")
    except NoSuchElementException:
        pass

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

    try:
        driver.find_element(By.ID, accessabilities.signup_next_button_id).click()
    except NoSuchElementException:
        pass

    # put an assert here