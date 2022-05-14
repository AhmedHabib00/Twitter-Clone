import accessabilities
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.support.ui import Select
import time
from conftest import start_driver
from conftest import end_driver


class TestSignupPage:
    def test_signup_invalid_email_and_name(self):
        # OPEN PAGE
        driver = start_driver()
        # SIGN UP BUTTON
        try:
            driver.find_element(By.ID, accessabilities.sign_up_with_email_button_id).click()
        except NoSuchElementException:
            pass
        time.sleep(10)

        # case 1
        # EMPTY NAME AND MAIL
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

        # CHECK THE ERROR MESSGAE
        try:
            assert 'Please select an item in the list.' == driver.find_element(By.ID,
                                                                               accessabilities.signup_month_list_id).get_attribute(
                "validationMessage")
        except NoSuchElementException:
            pass

        # CLOSE THE PAGE
        end_driver(driver)

    def test_signup_invalid_email_only(self):
        # OPEN PAGE
        driver = start_driver()
        # SIGN UP BUTTON
        try:
            driver.find_element(By.ID, accessabilities.sign_up_with_email_button_id).click()
        except NoSuchElementException:
            pass

        # VALID NAME
        try:
            driver.find_element(By.ID, accessabilities.signup_name_textbox_id).send_keys("Yasmeen")
        except NoSuchElementException:
            pass
        # EMPTY MAIL
        try:
            driver.find_element(By.ID, accessabilities.signup_email_textbox_id).send_keys("")
        except NoSuchElementException:
            pass
        # NEXT BUTTON
        try:
            driver.find_element(By.ID, accessabilities.signup_next_button_id).click()
        except NoSuchElementException:
            pass

        # CHECK THE ERROR MESSAGE
        try:
            assert 'Please select an item in the list.' == driver.find_element(By.ID,
                                                                               accessabilities.signup_month_list_id).get_attribute(
                "validationMessage")
        except NoSuchElementException:
            pass

        end_driver(driver)

    def test_signup_invalid_name_only(self):
        # OPEN PAGE
        driver = start_driver()
        # SIGN UP BUTTON
        try:
            driver.find_element(By.ID, accessabilities.sign_up_with_email_button_id).click()
        except NoSuchElementException:
            pass

        # INVALID NAME
        try:
            driver.find_element(By.ID, accessabilities.signup_name_textbox_id).send_keys("")
        except NoSuchElementException:
            pass

        # VALID MAIL
        try:
            driver.find_element(By.ID, accessabilities.signup_email_textbox_id).send_keys(
                "yasmeen_zaki01@gmail.com")
        except NoSuchElementException:
            pass
        # NEXT BUTTON
        try:
            driver.find_element(By.ID, accessabilities.signup_next_button_id).click()
        except NoSuchElementException:
            pass
        # CHECK THE ERROR MESSAGE

        try:
            assert 'Please select an item in the list.' == driver.find_element(By.ID,
                                                                               accessabilities.signup_month_list_id).get_attribute(
                "validationMessage")
        except NoSuchElementException:
            pass

        # CLOSE PAGE
        end_driver(driver)

    def test_signup_invalid_date_only(self):
        # OPEN PAGE
        driver = start_driver()
        # SIGN UP BUTTON
        try:
            driver.find_element(By.ID, accessabilities.sign_up_with_email_button_id).click()
        except NoSuchElementException:
            pass

        # VALID NAME
        try:
            driver.find_element(By.ID, accessabilities.signup_name_textbox_id).send_keys("Yasmeen")
        except NoSuchElementException:
            pass
        # VALID MAIL
        try:
            driver.find_element(By.ID, accessabilities.signup_email_textbox_id).send_keys(
                "yasmeen_zaki01@gmail.com")
        except NoSuchElementException:
            pass
        # NEXT BUTTON
        try:
            driver.find_element(By.ID, accessabilities.signup_next_button_id).click()
        except NoSuchElementException:
            pass

        try:
            assert 'Please select an item in the list.' == driver.find_element(By.ID,
                                                                               accessabilities.signup_month_list_id).get_attribute(
                "validationMessage")
        except NoSuchElementException:
            pass

        # CLOSE PAGE
        end_driver(driver)

    def test_signup_valid_date_only(self):
        # OPEN PAGE
        driver = start_driver()
        # SIGN UP BUTTON
        try:
            driver.find_element(By.ID, accessabilities.sign_up_with_email_button_id).click()
        except NoSuchElementException:
            pass

        # INVALID NAME
        try:
            driver.find_element(By.ID, accessabilities.signup_name_textbox_id).send_keys("")
        except NoSuchElementException:
            pass
        # INVALID MAIL
        try:
            driver.find_element(By.ID, accessabilities.signup_email_textbox_id).send_keys("")
        except NoSuchElementException:
            pass

        # VALID DATE
        try:
            Select(driver.find_element(By.ID, accessabilities.signup_month_list_id)).select_by_visible_text(
                'August')
        except NoSuchElementException:
            pass

        try:
            Select(driver.find_element(By.ID, accessabilities.signup_day_list_id)).select_by_visible_text('21')
        except NoSuchElementException:
            pass

        try:
            Select(driver.find_element(By.ID, accessabilities.signup_year_list_id)).select_by_visible_text('2001')
        except NoSuchElementException:
            pass

        # NEXT BUTTON
        try:
            driver.find_element(By.ID, accessabilities.signup_next_button_id).click()
        except NoSuchElementException:
            pass

        # CHECK THE ERROR MESSAGE
        try:
            assert driver.find_element(By.ID,
                                       accessabilities.signup_name_error) and driver.find_element(By.XPATH,
                                                                                                  accessabilities.signup_email_error)
        except NoSuchElementException:
            pass

        # CLOSE PAGE
        end_driver(driver)

    def test_signup_valid_date_and_name(self):
        # OPEN PAGE
        driver = start_driver()
        # SIGN UP BUTTON
        try:
            driver.find_element(By.ID, accessabilities.sign_up_with_email_button_id).click()
        except NoSuchElementException:
            pass

        # VALID NAME
        try:
            driver.find_element(By.ID, accessabilities.signup_name_textbox_id).send_keys("Yasmeen")
        except NoSuchElementException:
            pass
        # INVALID MAIL
        try:
            driver.find_element(By.ID, accessabilities.signup_email_textbox_id).send_keys("")
        except NoSuchElementException:
            pass
        # VALID MONTH
        try:
            Select(driver.find_element(By.ID, accessabilities.signup_month_list_id)).select_by_visible_text(
                'August')
        except NoSuchElementException:
            pass

        try:
            Select(driver.find_element(By.ID, accessabilities.signup_day_list_id)).select_by_visible_text('21')
        except NoSuchElementException:
            pass

        try:
            Select(driver.find_element(By.ID, accessabilities.signup_year_list_id)).select_by_visible_text('2001')
        except NoSuchElementException:
            pass

        # NEXT BUTTON
        try:
            driver.find_element(By.ID, accessabilities.signup_next_button_id).click()
        except NoSuchElementException:
            pass
        # CHECK THE ERROR MESSAGE
        try:
            assert driver.find_element(By.XPATH, accessabilities.signup_email_error).is_displayed()
        except NoSuchElementException:
            pass

        # CLOSE PAGE
        end_driver(driver)

    def test_signup_valid_date_and_email(self):
        # OPEN PAGE
        driver = start_driver()
        # SIGN UP BUTTON
        try:
            driver.find_element(By.ID, accessabilities.sign_up_with_email_button_id).click()
        except NoSuchElementException:
            pass

        # EMPTY NAME
        try:
            driver.find_element(By.ID, accessabilities.signup_name_textbox_id).send_keys("")
        except NoSuchElementException:
            pass
        # VALID MAIL
        try:
            driver.find_element(By.ID, accessabilities.signup_email_textbox_id).send_keys("yasmeen_zaki01@gmail")
        except NoSuchElementException:
            pass
        # VALID DATE
        try:
            Select(driver.find_element(By.ID, accessabilities.signup_month_list_id)).select_by_visible_text(
                'August')
        except NoSuchElementException:
            pass

        try:
            Select(driver.find_element(By.ID, accessabilities.signup_day_list_id)).select_by_visible_text('21')
        except NoSuchElementException:
            pass

        try:
            Select(driver.find_element(By.ID, accessabilities.signup_year_list_id)).select_by_visible_text('2001')
        except NoSuchElementException:
            pass
        # NEXT BUTTON
        try:
            driver.find_element(By.ID, accessabilities.signup_next_button_id).click()
        except NoSuchElementException:
            pass

        # CHECK THE ERROR MESSGAE
        try:
            assert driver.find_element(
                By.ID, accessabilities.signup_name_error).is_displayed()
        except NoSuchElementException:
            pass

        # CLOSE PAGE
        end_driver(driver)

    def test_invalid_email_address(self):
        # email address without @
        driver = start_driver()
        try:
            driver.find_element(By.ID, accessabilities.sign_up_with_email_button_id).click()
        except NoSuchElementException:
            pass
        try:
            driver.find_element(By.ID, accessabilities.signup_name_textbox_id).send_keys("Yasmeen Zaki")
        except NoSuchElementException:
            pass
        try:
            driver.find_element(By.ID, accessabilities.signup_email_textbox_id).send_keys("n")
        except NoSuchElementException:
            pass
        try:
            Select(driver.find_element(By.ID, accessabilities.signup_month_list_id)).select_by_visible_text(
                'August')
        except NoSuchElementException:
            pass

        try:
            Select(driver.find_element(By.ID, accessabilities.signup_day_list_id)).select_by_visible_text('21')
        except NoSuchElementException:
            pass

        try:
            Select(driver.find_element(By.ID, accessabilities.signup_year_list_id)).select_by_visible_text('2001')
        except NoSuchElementException:
            pass

        try:
            driver.find_element(By.ID, accessabilities.signup_next_button_id).click()
        except NoSuchElementException:
            pass

        try:
            assert ('Please include an' in driver.find_element(By.ID,
                                                               accessabilities.signup_email_textbox_id).get_attribute(
                "validationMessage"))
        except NoSuchElementException:
            pass

        # email with an '@' but without continuation
        try:
            driver.find_element(By.ID, accessabilities.signup_email_textbox_id).clear()
        except NoSuchElementException:
            pass

        try:
            driver.find_element(By.ID, accessabilities.signup_email_textbox_id).send_keys("nossair101@")
        except NoSuchElementException:
            pass

        try:
            driver.find_element(By.ID, accessabilities.signup_next_button_id).click()
        except NoSuchElementException:
            pass

        try:
            assert ('Please enter a part following' in driver.find_element(By.ID,
                                                                           accessabilities.signup_email_textbox_id).get_attribute(
                "validationMessage"))
        except NoSuchElementException:
            pass

        # email without .com
        try:
            driver.find_element(By.ID, accessabilities.signup_email_textbox_id).clear()
        except NoSuchElementException:
            pass

        try:
            driver.find_element(By.ID, accessabilities.signup_email_textbox_id).send_keys("nossair101@fff")
        except NoSuchElementException:
            pass

        try:
            driver.find_element(By.ID, accessabilities.signup_next_button_id).click()
        except NoSuchElementException:
            pass

        try:
            assert (driver.find_element(By.CSS_SELECTOR, accessabilities.invalid_email_error)).is_displayed()
        except NoSuchElementException:
            pass

        end_driver(driver)

    def test_valid_signup_with_email(self):
        driver = start_driver()
        try:
            driver.find_element(By.ID, accessabilities.sign_up_with_email_button_id).click()
        except NoSuchElementException:
            pass
        # case 8
        try:
            driver.find_element(By.ID, accessabilities.signup_name_textbox_id).send_keys("Yasmeen Zaki")
        except NoSuchElementException:
            pass

        try:
            driver.find_element(By.ID, accessabilities.signup_email_textbox_id).send_keys("nossair101@gmail.com")
        except NoSuchElementException:
            pass

        try:
            Select(driver.find_element(By.ID, accessabilities.signup_month_list_id)).select_by_visible_text(
                'August')
        except NoSuchElementException:
            pass

        try:
            Select(driver.find_element(By.ID, accessabilities.signup_day_list_id)).select_by_visible_text('21')
        except NoSuchElementException:
            pass

        try:
            Select(driver.find_element(By.ID, accessabilities.signup_year_list_id)).select_by_visible_text('2001')
        except NoSuchElementException:
            pass

        try:
            driver.find_element(By.ID, accessabilities.signup_next_button_id).click()
        except NoSuchElementException:
            pass

        try:
            assert ('We sent you a code' == driver.find_element(By.CSS_SELECTOR,
                                                                accessabilities.verification_page_title).text)
        except NoSuchElementException:
            pass

        end_driver(driver)

    def to_verification_page(self):
        driver = start_driver()
        try:
            driver.find_element(By.ID, accessabilities.sign_up_with_email_button_id).click()
        except NoSuchElementException:
            pass

        try:
            driver.find_element(By.ID, accessabilities.signup_name_textbox_id).send_keys("Yasmeen Zaki")
        except NoSuchElementException:
            pass

        try:
            driver.find_element(By.ID, accessabilities.signup_email_textbox_id).send_keys("nossair101@gmail.com")
        except NoSuchElementException:
            pass

        try:
            Select(driver.find_element(By.ID, accessabilities.signup_month_list_id)).select_by_visible_text(
                'August')
        except NoSuchElementException:
            pass

        try:
            Select(driver.find_element(By.ID, accessabilities.signup_day_list_id)).select_by_visible_text('21')
        except NoSuchElementException:
            pass

        try:
            Select(driver.find_element(By.ID, accessabilities.signup_year_list_id)).select_by_visible_text('2001')
        except NoSuchElementException:
            pass

        try:
            driver.find_element(By.ID, accessabilities.signup_next_button_id).click()
        except NoSuchElementException:
            pass
        driver = driver
        return driver

    def test_invalid_verification_code_1(self):
        driver = TestSignupPage.to_verification_page(self)
        try:
            driver.find_element(By.ID, accessabilities.verification_code_textbox_id).send_keys(
                accessabilities.incorrect_verification_code_1)
        except NoSuchElementException:
            pass

        try:
            driver.find_element(By.ID, accessabilities.verification_page_next_button).click()
        except NoSuchElementException:
            pass

        try:
            assert (driver.find_element(By.ID, accessabilities.incorrect_verification_error)).is_displayed()
        except NoSuchElementException:
            pass

        end_driver(driver)

    def test_invalid_verification_code_2(self):
        driver = TestSignupPage.to_verification_page(self)
        try:
            driver.find_element(By.ID, accessabilities.verification_code_textbox_id).send_keys('')
        except NoSuchElementException:
            pass

        try:
            driver.find_element(By.ID, accessabilities.verification_page_next_button).click()
        except NoSuchElementException:
            pass

        try:
            assert (driver.find_element(By.ID, accessabilities.incorrect_verification_error_1)).is_displayed()
        except NoSuchElementException:
            pass

        end_driver(driver)

    def test_invalid_verification_code_3(self):
        driver = TestSignupPage.to_verification_page(self)
        try:
            driver.find_element(By.ID, accessabilities.verification_code_textbox_id).send_keys(
                accessabilities.incorrect_verification_code_3)
        except NoSuchElementException:
            pass

        try:
            driver.find_element(By.ID, accessabilities.verification_page_next_button).click()
        except NoSuchElementException:
            pass

        try:
            assert (driver.find_element(By.ID, accessabilities.incorrect_verification_error_2)).is_displayed()
        except NoSuchElementException:
            pass

        end_driver(driver)
