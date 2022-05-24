import accessabilities
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException
from conftest import sign_in
from conftest import end_driver
import time


class TestSettingsPage:
    def test_password_change_invalid(self):

        driver = sign_in()

        try:
            driver.find_element(By.ID, accessabilities.Settings_navbar).click()
        except NoSuchElementException:
            pass

        try:
            driver.find_element(By.ID, accessabilities.Settings_change_password).click()
        except NoSuchElementException:
            pass

        try:
            driver.find_element(By.ID, accessabilities.Settings_current_password).click()
            driver.find_element(By.ID, accessabilities.Settings_current_password).send_keys(
                accessabilities.sign_in_password_textbox_id)
        except NoSuchElementException:
            pass

        #LESS THAN 10 CHAR
        try:
            driver.find_element(By.ID, accessabilities.Settings_new_password).click()
            driver.find_element(By.ID, accessabilities.Settings_new_password).send_keys('Abcd@2')
        except NoSuchElementException:
            pass

        try:
            driver.find_element(By.ID, accessabilities.Settings_confirm_password).click()
            driver.find_element(By.ID, accessabilities.Settings_confirm_password).send_keys('Abcd@2')
        except NoSuchElementException:
            pass

        try:
            driver.find_element(By.ID, accessabilities.Settings_save_pass_change).click()
        except NoSuchElementException:
            pass

        try:
            assert (driver.find_element(By.ID, accessabilities. Settings_password_error).is_displayed())
        except NoSuchElementException:
            pass
        end_driver(driver)

    def test_password_change_wrong_confirmation(self):

        driver = sign_in()

        try:
            driver.find_element(By.ID, accessabilities.Settings_navbar).click()
        except NoSuchElementException:
            pass

        try:
            driver.find_element(By.ID, accessabilities.Settings_change_password).click()
        except NoSuchElementException:
            pass

        try:
            driver.find_element(By.ID, accessabilities.Settings_current_password).click()
            driver.find_element(By.ID, accessabilities.Settings_current_password).send_keys(
                accessabilities.sign_in_password_textbox_id)
        except NoSuchElementException:
            pass

        # Valid password
        try:
            driver.find_element(By.ID, accessabilities.Settings_new_password).click()
            driver.find_element(By.ID, accessabilities.Settings_new_password).send_keys('Abcdefghijk@2')
        except NoSuchElementException:
            pass

        #InValid Conformation
        try:
            driver.find_element(By.ID, accessabilities.Settings_confirm_password).click()
            driver.find_element(By.ID, accessabilities.Settings_confirm_password).send_keys('1bcdefghijk@2')
        except NoSuchElementException:
            pass

        try:
            driver.find_element(By.ID, accessabilities.Settings_save_pass_change).click()
        except NoSuchElementException:
            pass

        try:
            assert (driver.find_element(By.ID, accessabilities.Settings_confirm_password_error).is_displayed())
        except NoSuchElementException:
            pass
        end_driver(driver)

    def test_password_change_No_confirmation(self):

        driver = sign_in()

        try:
            driver.find_element(By.ID, accessabilities.Settings_navbar).click()
        except NoSuchElementException:
            pass

        try:
            driver.find_element(By.ID, accessabilities.Settings_change_password).click()
        except NoSuchElementException:
            pass

        try:
            driver.find_element(By.ID, accessabilities.Settings_current_password).click()
            driver.find_element(By.ID, accessabilities.Settings_current_password).send_keys(
                accessabilities.sign_in_password_textbox_id)
        except NoSuchElementException:
            pass

        # Valid password
        try:
            driver.find_element(By.ID, accessabilities.Settings_new_password).click()
            driver.find_element(By.ID, accessabilities.Settings_new_password).send_keys('Abcdefghijk@2')
        except NoSuchElementException:
            pass


        #NO CONFIRMATION DATA INPUT

        try:
            driver.find_element(By.ID, accessabilities.Settings_save_pass_change).click()
        except NoSuchElementException:
            pass

        try:
            assert (driver.find_element(By.ID, accessabilities.Settings_confirm_password_error).is_displayed())
        except NoSuchElementException:
            pass
        end_driver(driver)

    def test_password_change_wrong_confirmation(self):

        driver = sign_in()

        try:
            driver.find_element(By.ID, accessabilities.Settings_navbar).click()
        except NoSuchElementException:
            pass

        try:
            driver.find_element(By.ID, accessabilities.Settings_change_password).click()
        except NoSuchElementException:
            pass

        try:
            driver.find_element(By.ID, accessabilities.Settings_current_password).click()
            driver.find_element(By.ID, accessabilities.Settings_current_password).send_keys(
                accessabilities.sign_in_password_textbox_id)
        except NoSuchElementException:
            pass

        # Valid password
        try:
            driver.find_element(By.ID, accessabilities.Settings_new_password).click()
            driver.find_element(By.ID, accessabilities.Settings_new_password).send_keys('Abcdefghijk@2')
        except NoSuchElementException:
            pass

        # InValid Conformation
        try:
            driver.find_element(By.ID, accessabilities.Settings_confirm_password).click()
            driver.find_element(By.ID, accessabilities.Settings_confirm_password).send_keys('1bcdefghijk@2')
        except NoSuchElementException:
            pass

        try:
            driver.find_element(By.ID, accessabilities.Settings_save_pass_change).click()
        except NoSuchElementException:
            pass

        try:
            assert (driver.find_element(By.ID, accessabilities.Settings_confirm_password_error).is_displayed())
        except NoSuchElementException:
            pass
        end_driver(driver)

    def test_password_change_Valid(self):

        driver = sign_in()

        try:
            driver.find_element(By.ID, accessabilities.Settings_navbar).click()
        except NoSuchElementException:
            pass

        try:
            driver.find_element(By.ID, accessabilities.Settings_change_password).click()
        except NoSuchElementException:
            pass

        try:
            driver.find_element(By.ID, accessabilities.Settings_current_password).click()
            driver.find_element(By.ID, accessabilities.Settings_current_password).send_keys(
                accessabilities.sign_in_password_textbox_id)
        except NoSuchElementException:
            pass

        # Valid password
        try:
            driver.find_element(By.ID, accessabilities.Settings_new_password).click()
            driver.find_element(By.ID, accessabilities.Settings_new_password).send_keys('Abcdefghijk@2')
        except NoSuchElementException:
            pass

        # InValid Conformation
        try:
            driver.find_element(By.ID, accessabilities.Settings_confirm_password).click()
            driver.find_element(By.ID, accessabilities.Settings_confirm_password).send_keys('Abcdefghijk@2')
        except NoSuchElementException:
            pass

        try:
            driver.find_element(By.ID, accessabilities.Settings_save_pass_change).click()
        except NoSuchElementException:
            pass

        end_driver(driver)

        time.sleep(2)

        driver = sign_in()

        try:
            assert (driver.find_element(By.ID, accessabilities.sign_in_invalid_password_error).is_displayed())
        except NoSuchElementException:
            pass
        time.sleep(2)

        end_driver(driver)

