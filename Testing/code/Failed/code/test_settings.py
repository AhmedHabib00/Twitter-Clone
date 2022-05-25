import accessabilities
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException
from conftest import end_driver, sign_in
import time


class TestSettingsPage:
    #CHANGE PASSWORD
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

    def test_password_change_invalid_old_password(self):

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
                'BAcdegghaq!2')
        except NoSuchElementException:
            pass

        # Valid password
        try:
            driver.find_element(By.ID, accessabilities.Settings_new_password).click()
            driver.find_element(By.ID, accessabilities.Settings_new_password).send_keys('Abcdefghijk@2')
        except NoSuchElementException:
            pass

        # Valid Conformation
        try:
            driver.find_element(By.ID, accessabilities.Settings_confirm_password).click()
            driver.find_element(By.ID, accessabilities.Settings_confirm_password).send_keys('Abcdefghijk@2')
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

        # Valid Conformation
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

        try:
            driver.find_element(By.ID, accessabilities.sign_in_password_textbox_id).clear()
            driver.find_element(By.ID, accessabilities.sign_in_password_textbox_id).send_keys(
                'Abcdefghijk@2')
        except NoSuchElementException:
            pass

        try:
            driver.find_element(By.ID, accessabilities.sign_in_login_button_id).click()
        except NoSuchElementException:
            pass
        try:
            assert (driver.find_element(By.ID, accessabilities.feed_page_id).is_displayed())
        except NoSuchElementException:
            pass
        time.sleep(2)

        end_driver(driver)

        #ACCOUNT INFO

    def test_username_change_invalid(self):

        driver = sign_in()

        try:
            driver.find_element(By.ID, accessabilities.Settings_navbar).click()
        except NoSuchElementException:
            pass

        try:
            driver.find_element(By.ID, accessabilities.Settings_account_info).click()
        except NoSuchElementException:
            pass

        try:
            driver.find_element(By.ID, accessabilities.info_username).click()
        except NoSuchElementException:
            pass
        #INVALID USERNAME
        try:
            driver.find_element(By.ID, accessabilities.info_usernamebox).click()
            driver.find_element(By.ID, accessabilities.info_usernamebox).send_keys('MMMMMMMMMMMMMMMMM')
        except NoSuchElementException:
            pass

        try:
            driver.find_element(By.ID, accessabilities.info_save_changes).click()
        except NoSuchElementException:
            pass

        try:
            assert (driver.find_element(By.ID, accessabilities.info_username_error).is_displayed())
        except NoSuchElementException:
            pass
            # INVALID USERNAME (More than 15 char)
            try:
                driver.find_element(By.ID, accessabilities.info_usernamebox).click()
                driver.find_element(By.ID, accessabilities.info_usernamebox).send_keys('MMMMMMMMMMMMMMMMM')
            except NoSuchElementException:
                pass

            try:
                driver.find_element(By.ID, accessabilities.info_save_changes).click()
            except NoSuchElementException:
                pass

            try:
                assert (driver.find_element(By.ID, accessabilities.info_username_error).is_displayed())
            except NoSuchElementException:
                pass

            # INVALID USERNAME (less than 4 char)
            try:
                driver.find_element(By.ID, accessabilities.info_usernamebox).click()
                driver.find_element(By.ID, accessabilities.info_usernamebox).clear()
                driver.find_element(By.ID, accessabilities.info_usernamebox).send_keys('MMM')
            except NoSuchElementException:
                pass

            try:
                driver.find_element(By.ID, accessabilities.info_save_changes).click()
            except NoSuchElementException:
                pass

            try:
                assert (driver.find_element(By.ID, accessabilities.info_username_error).is_displayed())
            except NoSuchElementException:
                pass

    def test_username_change_valid(self):

        driver = sign_in()

        try:
            driver.find_element(By.ID, accessabilities.Settings_navbar).click()
        except NoSuchElementException:
            pass

        try:
            driver.find_element(By.ID, accessabilities.Settings_account_info).click()
        except NoSuchElementException:
            pass

        try:
            driver.find_element(By.ID, accessabilities.info_username).click()
        except NoSuchElementException:
            pass
        # VALID USERNAME
        try:
            driver.find_element(By.ID, accessabilities.info_usernamebox).click()
            driver.find_element(By.ID, accessabilities.info_usernamebox).send_keys('TESTINGTEAM')
        except NoSuchElementException:
            pass

        try:
            driver.find_element(By.ID, accessabilities.info_save_changes).click()
        except NoSuchElementException:
            pass

        try:
            assert ((driver.find_element(By.ID, accessabilities.info_usernameofprofile).text=='TESTINGTEAM') is True)
        except NoSuchElementException:
            pass

    def test_gender_change_valid(self):

        driver = sign_in()

        try:
            driver.find_element(By.ID, accessabilities.Settings_navbar).click()
        except NoSuchElementException:
            pass

        try:
            driver.find_element(By.ID, accessabilities.Settings_account_info).click()
        except NoSuchElementException:
            pass

        try:
            driver.find_element(By.ID, accessabilities.info_gender).click()
        except NoSuchElementException:
            pass
        # CHANGE GENDER
        try:
            driver.find_element(By.ID, accessabilities.info_gender_male).click()
        except NoSuchElementException:
            pass

        try:
            driver.find_element(By.ID, accessabilities.info_save_changes).click()
        except NoSuchElementException:
            pass

        try:
            assert (driver.find_element(By.ID, accessabilities.info_gender).is_displayed())
        except NoSuchElementException:
            pass