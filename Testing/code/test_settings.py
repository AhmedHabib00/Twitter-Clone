from conftest import accessabilities, conftest
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException
from conftest.conftest import start_driver
from conftest.conftest import end_driver
import pyautogui
import os
import time
import pytest
from test_homepage import TestHomePage


class TestSettingsPage:
    def test_password_change_invalid(self):

        driver = TestHomePage.sign_in(self)

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
            driver.find_element(By.ID, accessabilities.Settings_current_password).send_keys(accessabilities.sign_in_password_textbox_id)
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

        driver = TestHomePage.sign_in(self)

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

        driver = TestHomePage.sign_in(self)

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

        driver = TestHomePage.sign_in(self)

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

        driver = TestHomePage.sign_in(self)

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

        driver = TestHomePage.sign_in(self)

        try:
            assert (driver.find_element(By.ID, accessabilities.sign_in_invalid_password_error).is_displayed())
        except NoSuchElementException:
            pass
        time.sleep(2)

        end_driver(driver)

