import time
from selenium.common.exceptions import NoSuchElementException
import and_accessabilities
import and_conftest
from appium.webdriver.common.appiumby import AppiumBy
from selenium.webdriver import ActionChains
from selenium.webdriver.common.actions import interaction
from selenium.webdriver.common.actions.action_builder import ActionBuilder
from selenium.webdriver.common.actions.pointer_input import PointerInput




class TestSettingsPage:
    #Settings
    def test_password_change_invalid(self):
        WebDriver = and_conftest.start_up()

        try:
            WebDriver.find_element(AppiumBy.ID, and_accessabilities.Settings_navbar).click()
        except NoSuchElementException:
            pass

        try:
            WebDriver.find_element(AppiumBy.XPATH, and_accessabilities.setting_change_password_xpath).click()
        except NoSuchElementException:
            pass

        try:
            WebDriver.find_element(AppiumBy.XPATH, and_accessabilities.settings_current_password_xpath).click()
            WebDriver.find_element(AppiumBy.XPATH, and_accessabilities.settings_current_password_xpath).send_keys(
                and_accessabilities.password)
        except NoSuchElementException:
            pass

        #LESS THAN 10 CHAR
        try:
            WebDriver.find_element(AppiumBy.XPATH, and_accessabilities.settings_new_password_xpath).click()
            WebDriver.find_element(AppiumBy.XPATH, and_accessabilities.settings_new_password_xpath).send_keys('Abcd@2')
        except NoSuchElementException:
            pass

        try:
            WebDriver.find_element(AppiumBy.XPATH, and_accessabilities.settings_confirm_password_xpath).click()
            WebDriver.find_element(AppiumBy.XPATH, and_accessabilities.settings_confirm_password_xpath).send_keys('Abcd@2')
        except NoSuchElementException:
            pass

        try:
            WebDriver.find_element(AppiumBy.XPATH, and_accessabilities.settings_save_changes_xpath).click()
        except NoSuchElementException:
            pass

        try:
            assert (WebDriver.find_element(AppiumBy.XPATH, and_accessabilities. setting_password_error_xpath).is_displayed())
        except NoSuchElementException:
            pass
        and_conftest.teardownapp(WebDriver)

    def test_password_change_wrong_confirmation(self):

        WebDriver = and_conftest.start_up()

        try:
            WebDriver.find_element(AppiumBy.ID, and_accessabilities.Settings_navbar).click()
        except NoSuchElementException:
            pass

        try:
            WebDriver.find_element(AppiumBy.XPATH, and_accessabilities.setting_change_password_xpath).click()
        except NoSuchElementException:
            pass

        try:
            WebDriver.find_element(AppiumBy.XPATH, and_accessabilities.settings_current_password_xpath).click()
            WebDriver.find_element(AppiumBy.XPATH, and_accessabilities.settings_current_password_xpath).send_keys(
                and_accessabilities.password)
        except NoSuchElementException:
            pass

        # Valid Password
        try:
            WebDriver.find_element(AppiumBy.XPATH, and_accessabilities.settings_new_password_xpath).click()
            WebDriver.find_element(AppiumBy.XPATH, and_accessabilities.settings_new_password_xpath).send_keys('Abcdefghijk@2')
        except NoSuchElementException:
            pass

        # InValid Confirmation
        try:
            WebDriver.find_element(AppiumBy.XPATH, and_accessabilities.settings_confirm_password_xpath).click()
            WebDriver.find_element(AppiumBy.XPATH, and_accessabilities.settings_confirm_password_xpath).send_keys(
                '1bcdefghijk@2')
        except NoSuchElementException:
            pass

        try:
            WebDriver.find_element(AppiumBy.XPATH, and_accessabilities.settings_save_changes_xpath).click()
        except NoSuchElementException:
            pass

        try:
            assert (
                WebDriver.find_element(AppiumBy.XPATH, and_accessabilities.setting_password_error_xpath).is_displayed())
        except NoSuchElementException:
            pass
        and_conftest.teardownapp(WebDriver)


    def test_password_change_No_confirmation(self):

        WebDriver = and_conftest.start_up()

        try:
            WebDriver.find_element(AppiumBy.ID, and_accessabilities.Settings_navbar).click()
        except NoSuchElementException:
            pass

        try:
            WebDriver.find_element(AppiumBy.XPATH, and_accessabilities.setting_change_password_xpath).click()
        except NoSuchElementException:
            pass

        try:
            WebDriver.find_element(AppiumBy.XPATH, and_accessabilities.settings_current_password_xpath).click()
            WebDriver.find_element(AppiumBy.XPATH, and_accessabilities.settings_current_password_xpath).send_keys(
                and_accessabilities.password)
        except NoSuchElementException:
            pass

        # Valid Password
        try:
            WebDriver.find_element(AppiumBy.XPATH, and_accessabilities.settings_new_password_xpath).click()
            WebDriver.find_element(AppiumBy.XPATH, and_accessabilities.settings_new_password_xpath).send_keys(
                'Abcdefghijk@2')
        except NoSuchElementException:
            pass

        # No Confirmation

        try:
            WebDriver.find_element(AppiumBy.XPATH, and_accessabilities.settings_save_changes_xpath).click()
        except NoSuchElementException:
            pass

        try:
            assert (
                WebDriver.find_element(AppiumBy.XPATH, and_accessabilities.setting_password_error_xpath).is_displayed())
        except NoSuchElementException:
            pass
        and_conftest.teardownapp(WebDriver)

    def test_password_change_invalid_old_password(self):

        WebDriver = and_conftest.start_up()

        try:
            WebDriver.find_element(AppiumBy.ID, and_accessabilities.Settings_navbar).click()
        except NoSuchElementException:
            pass

        try:
            WebDriver.find_element(AppiumBy.XPATH, and_accessabilities.setting_change_password_xpath).click()
        except NoSuchElementException:
            pass

        try:
            WebDriver.find_element(AppiumBy.XPATH, and_accessabilities.settings_current_password_xpath).click()
            WebDriver.find_element(AppiumBy.XPATH, and_accessabilities.settings_current_password_xpath).send_keys(
                'BAcdegghaq!2')
        except NoSuchElementException:
            pass

        # Valid Password
        try:
            WebDriver.find_element(AppiumBy.XPATH, and_accessabilities.settings_new_password_xpath).click()
            WebDriver.find_element(AppiumBy.XPATH, and_accessabilities.settings_new_password_xpath).send_keys(
                'Abcdefghijk@2')
        except NoSuchElementException:
            pass

        # Valid confirmation
        try:
            WebDriver.find_element(AppiumBy.XPATH, and_accessabilities.settings_confirm_password_xpath).click()
            WebDriver.find_element(AppiumBy.XPATH, and_accessabilities.settings_confirm_password_xpath).send_keys(
                'Abcdefghijk@2')
        except NoSuchElementException:
            pass


        try:
            WebDriver.find_element(AppiumBy.XPATH, and_accessabilities.settings_save_changes_xpath).click()
        except NoSuchElementException:
            pass

        try:
            assert (
                WebDriver.find_element(AppiumBy.XPATH, and_accessabilities.setting_password_error_xpath).is_displayed())
        except NoSuchElementException:
            pass
        and_conftest.teardownapp(WebDriver)

    def test_password_change_Valid(self):

        WebDriver = and_conftest.start_up()

        try:
            WebDriver.find_element(AppiumBy.ID, and_accessabilities.Settings_navbar).click()
        except NoSuchElementException:
            pass

        try:
            WebDriver.find_element(AppiumBy.XPATH, and_accessabilities.setting_change_password_xpath).click()
        except NoSuchElementException:
            pass

        try:
            WebDriver.find_element(AppiumBy.XPATH, and_accessabilities.settings_current_password_xpath).click()
            WebDriver.find_element(AppiumBy.XPATH, and_accessabilities.settings_current_password_xpath).send_keys(
                and_accessabilities.password)
        except NoSuchElementException:
            pass

        # Valid Password
        try:
            WebDriver.find_element(AppiumBy.XPATH, and_accessabilities.settings_new_password_xpath).click()
            WebDriver.find_element(AppiumBy.XPATH, and_accessabilities.settings_new_password_xpath).send_keys(
                'Abcdefghijk@2')
        except NoSuchElementException:
            pass

        # Valid confirmation
        try:
            WebDriver.find_element(AppiumBy.XPATH, and_accessabilities.settings_confirm_password_xpath).click()
            WebDriver.find_element(AppiumBy.XPATH, and_accessabilities.settings_confirm_password_xpath).send_keys(
                'Abcdefghijk@2')
        except NoSuchElementException:
            pass

        try:
            WebDriver.find_element(AppiumBy.XPATH, and_accessabilities.settings_save_changes_xpath).click()
        except NoSuchElementException:
            pass

        time.sleep(2)


        try:
            assert ( WebDriver.find_element(AppiumBy.XPATH, and_accessabilities.setting_change_password_xpath).is_displayed())
        except NoSuchElementException:
            pass

        and_conftest.teardownapp(WebDriver)


    def test_username_change_invalid(self):

        WebDriver = and_conftest.start_up()

        try:
            WebDriver.find_element(AppiumBy.XPATH, and_accessabilities.nav_bar_xpath).click()
        except NoSuchElementException:
            pass

        try:
            WebDriver.find_element(AppiumBy.XPATH, and_accessabilities.settings_account_info_xpath).click()
        except NoSuchElementException:
            pass

        try:
            WebDriver.find_element(AppiumBy.XPATH, and_accessabilities.settings_info_username_xpath).click()
        except NoSuchElementException:
            pass
        #INVALID USERNAME (More than 15 char)
        try:
            WebDriver.find_element(AppiumBy.XPATH, and_accessabilities.settings_usernamebox_xpath).click()
            WebDriver.find_element(AppiumBy.XPATH, and_accessabilities.settings_usernamebox_xpath).send_keys('MMMMMMMMMMMMMMMMM')
        except NoSuchElementException:
            pass

        try:
            WebDriver.find_element(AppiumBy.XPATH, and_accessabilities.settings_save_changes_xpath).click()
        except NoSuchElementException:
            pass

        try:
            assert (WebDriver.find_element(AppiumBy.XPATH, and_accessabilities.settings_username_error_xpath).is_displayed())
        except NoSuchElementException:
            pass

        and_conftest.teardownapp(WebDriver)

    def test_username_change_valid(self):

        WebDriver = and_conftest.start_up()

        try:
            WebDriver.find_element(AppiumBy.XPATH, and_accessabilities.nav_bar_xpath).click()
        except NoSuchElementException:
            pass

        try:
            WebDriver.find_element(AppiumBy.XPATH, and_accessabilities.settings_account_info_xpath).click()
        except NoSuchElementException:
            pass

        try:
            WebDriver.find_element(AppiumBy.XPATH, and_accessabilities.settings_info_username_xpath).click()
        except NoSuchElementException:
            pass
        # VALID USERNAME
        try:
            WebDriver.find_element(AppiumBy.XPATH, and_accessabilities.settings_usernamebox_xpath).click()
            WebDriver.find_element(AppiumBy.XPATH, and_accessabilities.settings_usernamebox_xpath).send_keys(
                'TESTINGTEAM')
        except NoSuchElementException:
            pass

        try:
            WebDriver.find_element(AppiumBy.XPATH, and_accessabilities.settings_save_changes_xpath).click()
        except NoSuchElementException:
            pass

        try:
            assert (WebDriver.find_element(AppiumBy.XPATH,
                                           and_accessabilities.settings_username_error_xpath).is_displayed())
        except NoSuchElementException:
            pass

        and_conftest.teardownapp(WebDriver)
        time.sleep(5)
        WebDriver= and_conftest.start_up()

        try:
            WebDriver.find_element(AppiumBy.XPATH, and_accessabilities.nav_bar_xpath).click()
        except NoSuchElementException:
            pass

        try:
            WebDriver.find_element(AppiumBy.ID, and_accessabilities.profile_id).click()
        except NoSuchElementException:
            pass

        try:
            assert ((WebDriver.find_element(AppiumBy.XPATH, and_accessabilities.settings_info_username_xpath).text=='TESTINGTEAM') is True)
        except NoSuchElementException:
            pass

        and_conftest.teardownapp(WebDriver)

    def test_gender_change_valid(self):

        WebDriver = and_conftest.start_up()

        try:
            WebDriver.find_element(AppiumBy.XPATH, and_accessabilities.nav_bar_xpath).click()
        except NoSuchElementException:
            pass

        try:
            WebDriver.find_element(AppiumBy.XPATH, and_accessabilities.settings_account_info_xpath).click()
        except NoSuchElementException:
            pass

        try:
            WebDriver.find_element(AppiumBy.XPATH, and_accessabilities.settings_info_gender_xpath).click()
        except NoSuchElementException:
            pass
        # Change Gender
        try:
            WebDriver.find_element(AppiumBy.XPATH, and_accessabilities.info_gender_male_xpath).click()
        except NoSuchElementException:
            pass

        try:
            WebDriver.find_element(AppiumBy.XPATH, and_accessabilities.settings_save_changes_xpath).click()
        except NoSuchElementException:
            pass

        and_conftest.teardownapp(WebDriver)
        time.sleep(5)
        WebDriver = and_conftest.start_up()

        try:
            WebDriver.find_element(AppiumBy.XPATH, and_accessabilities.nav_bar_xpath).click()
        except NoSuchElementException:
            pass

        try:
            WebDriver.find_element(AppiumBy.ID, and_accessabilities.profile_id).click()
        except NoSuchElementException:
            pass

        try:
            assert ((WebDriver.find_element(AppiumBy.XPATH,
                                            and_accessabilities.setting_gender_profile_info_xpath).text == 'MALE') is True)
        except NoSuchElementException:
            pass

        and_conftest.teardownapp(WebDriver)
