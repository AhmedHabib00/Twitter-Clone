import accessabilities
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException
import time
import pytest


class TestLoginPage:
    def test_empty_username(self):
        try:
            self.driver.find_element(By.ID, accessabilities.sign_in_button_id).click()
        except NoSuchElementException:
            pass

        try:
            self.driver.find_element(By.ID, accessabilities.sign_in_email_textbox_id).send_keys("")
        except NoSuchElementException:
            pass

        try:
            self.driver.find_element(By.ID, accessabilities.sign_in_next_button).click()
        except NoSuchElementException:
            pass

        try:
            assert self.driver.find_element(By.ID, accessabilities.empty_username_error).is_displayed() is True
        except NoSuchElementException:
            pass

    def test_empty_password(self):

        try:
            self.driver.find_element(By.ID, accessabilities.sign_in_button_id).click()
        except NoSuchElementException:
            pass

        try:
            self.driver.find_element(By.ID, accessabilities.sign_in_email_textbox_id).send_keys(
                accessabilities.username)
        except NoSuchElementException:
            pass

        try:
            self.driver.find_element(By.ID, accessabilities.sign_in_next_button).click()
        except NoSuchElementException:
            pass

        try:
            self.driver.find_element(By.ID, accessabilities.sign_in_password_textbox_id).send_keys("")
        except NoSuchElementException:
            pass

        try:
            self.driver.find_element(By.ID, accessabilities.sign_in_login_button_id).click()
        except NoSuchElementException:
            pass

        try:
            assert self.driver.find_element(By.ID, accessabilities.empty_password_error).is_displayed() is True
        except NoSuchElementException:
            pass

    def test_empty_password(self):

        try:
            self.driver.find_element(By.ID, accessabilities.sign_in_button_id).click()
        except NoSuchElementException:
            pass

        try:
            self.driver.find_element(By.ID, accessabilities.sign_in_email_textbox_id).send_keys(
                accessabilities.username)
        except NoSuchElementException:
            pass

        try:
            self.driver.find_element(By.ID, accessabilities.sign_in_next_button).click()
        except NoSuchElementException:
            pass

        try:
            self.driver.find_element(By.ID, accessabilities.sign_in_password_textbox_id).send_keys("")
        except NoSuchElementException:
            pass

        try:
            self.driver.find_element(By.ID, accessabilities.sign_in_login_button_id).click()
        except NoSuchElementException:
            pass

        try:
            assert self.driver.find_element(By.ID, accessabilities.empty_password_error).is_displayed() is True
        except NoSuchElementException:
            pass

    def test_incorrect_password(self):

        try:
            self.driver.find_element(By.ID, accessabilities.sign_in_button_id).click()
        except NoSuchElementException:
            pass

        try:
            self.driver.find_element(By.ID, accessabilities.sign_in_email_textbox_id).send_keys(
                accessabilities.username)
        except NoSuchElementException:
            pass

        try:
            self.driver.find_element(By.ID, accessabilities.sign_in_next_button).click()
        except NoSuchElementException:
            pass

        try:
            self.driver.find_element(By.ID, accessabilities.sign_in_password_textbox_id).send_keys(
                accessabilities.sign_in_invalid_password)
        except NoSuchElementException:
            pass

        try:
            self.driver.find_element(By.ID, accessabilities.sign_in_login_button_id).click()
        except NoSuchElementException:
            pass

        try:
            assert self.driver.find_element(By.ID, accessabilities.sign_in_invalid_password_error).is_displayed() is True
        except NoSuchElementException:
            pass

    def test_unregistered_username_signin(self):
        try:
            self.driver.find_element(By.ID, accessabilities.sign_in_button_id).click()
        except NoSuchElementException:
            pass

        try:
            self.driver.find_element(By.ID, accessabilities.sign_in_email_textbox_id).send_keys(
                accessabilities.sample_username)
        except NoSuchElementException:
            pass

        try:
            self.driver.find_element(By.ID, accessabilities.sign_in_next_button).click()
        except NoSuchElementException:
            pass

        with pytest.raises(NoSuchElementException):
            self.driver.find_element(By.ID, accessabilities.sign_in_password_textbox_id)

    def test_unregistered_email_signin(self):
        try:
            self.driver.find_element(By.ID, accessabilities.sign_in_button_id).click()
        except NoSuchElementException:
            pass

        try:
            self.driver.find_element(By.ID, accessabilities.sign_in_email_textbox_id).send_keys(
                accessabilities.sample_email)
        except NoSuchElementException:
            pass

        try:
            self.driver.find_element(By.ID, accessabilities.sign_in_next_button).click()
        except NoSuchElementException:
            pass

        with pytest.raises(NoSuchElementException):
            self.driver.find_element(By.ID, accessabilities.sign_in_password_textbox_id)

    # forgot password
    def test_unregistered_email_forgot_password(self):
        try:
            self.driver.find_element(By.ID, accessabilities.sign_in_button_id).click()
        except NoSuchElementException:
            pass

        try:
            self.driver.find_element(By.ID, accessabilities.forgot_password_button).click()
        except NoSuchElementException:
            pass

        try:
            self.driver.find_element(By.ID, accessabilities.forgot_password_textbox_id).send_keys(
                accessabilities.sample_email)
        except NoSuchElementException:
            pass

        try:
            self.driver.find_element(By.ID, accessabilities.forgot_password_search_button_id).click()
        except NoSuchElementException:
            pass

        try:
           assert self.driver.find_element(By.ID, accessabilities.user_not_found_error).is_displayed() is True
        except NoSuchElementException:
            pass

    def test_unregistered_username_forgot_password(self):
        # OPEN START PAGE
        time.sleep(5)
        try:
            self.driver.find_element(By.ID, accessabilities.sign_in_button_id).click()
        except NoSuchElementException:
            pass

        try:
            self.driver.find_element(By.XPATH, accessabilities.forgot_password_button).click()
        except NoSuchElementException:
            pass

        try:
            self.driver.find_element(By.ID, accessabilities.forgot_password_textbox_id).send_keys(
                accessabilities.sample_username)
        except NoSuchElementException:
            pass

        try:
            self.driver.find_element(By.ID, accessabilities.forgot_password_search_button_id).click()
        except NoSuchElementException:
            pass

        # CHECK THE ERROR MESSAGE

        try:
            assert self.driver.find_element(By.CSS_SELECTOR, accessabilities.user_not_found_error).is_displayed() is True
        except NoSuchElementException:
            pass
        # CLOSE PAGE

