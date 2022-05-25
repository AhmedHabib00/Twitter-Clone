import accessabilities
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException
from conftest import end_driver
import pyautogui
import os
import time
from test_homepage import TestHomePage


class TestProfilePage:


    def test_name_change_invalid(self):
        driver = TestHomePage.sign_in(self)

        try:
            driver.find_element(By.ID, accessabilities.profile_navbar).click()
        except NoSuchElementException:
            pass

        try:
            driver.find_element(By.ID, accessabilities.profile_edit_button).click()
        except NoSuchElementException:
            pass

        try:
            driver.find_element(By.ID, accessabilities.profile_name_textbox).click()
        except NoSuchElementException:
            pass

        try:
            driver.find_element(By.ID, accessabilities.profile_name_textbox).send_keys('')
        except NoSuchElementException:
            pass

        try:
            driver.find_element(By.ID, accessabilities.profile_save_changes).click()
        except NoSuchElementException:
            pass

        try:
            assert driver.find_element(By.ID, accessabilities.profile_name_error_limitation).is_displayed() is True
        except NoSuchElementException:
            pass

        try:
            driver.find_element(By.ID, accessabilities.profile_close_edit).click()
        except NoSuchElementException:
            pass

        try:
            driver.find_element(By.ID, accessabilities.profile_discard_changes).click()
        except NoSuchElementException:
            pass

        end_driver(driver)

    def test_name_change_valid(self):
        driver = TestHomePage.sign_in(self)
        try:
            driver.find_element(By.ID, accessabilities.profile_navbar).click()
        except NoSuchElementException:
            pass

        try:
            driver.find_element(By.ID, accessabilities.profile_edit_button).click()
        except NoSuchElementException:
            pass

        try:
            driver.find_element(By.ID, accessabilities.profile_name_textbox).click()
        except NoSuchElementException:
            pass

        try:
            driver.find_element(By.ID, accessabilities.profile_name_textbox).send_keys('Name')
        except NoSuchElementException:
            pass

        try:
            driver.find_element(By.ID, accessabilities.profile_bio_textbox).click()
        except NoSuchElementException:
            pass

        try:
            driver.find_element(By.ID, accessabilities.profile_bio_textbox).send_keys('')
        except NoSuchElementException:
            pass

        try:
            driver.find_element(By.ID, accessabilities.profile_save_changes).click()
        except NoSuchElementException:
            pass

        try:
            assert driver.find_element(By.ID, 'name').text == 'Name' is True
            assert driver.find_element(By.ID, 'bio').text == '' is True
        except NoSuchElementException:
            pass

        end_driver(driver)

    def test_cover_photo_change_valid(self):
        driver = TestHomePage.sign_in(self)
        try:
            driver.find_element(By.ID, accessabilities.profile_navbar).click()
        except NoSuchElementException:
            pass

        try:
            driver.find_element(By.ID, accessabilities.profile_edit_button).click()
        except NoSuchElementException:
            pass

        try:
            driver.find_element(By.ID, accessabilities.profile_add_photo_cover).click()
        except NoSuchElementException:
            pass

        time.sleep(2)
        pyautogui.write(os.getcwd() + "\images\imageabcde1.png", interval=0.05)
        pyautogui.press('return')
        time.sleep(2)

        try:
            driver.find_element(By.ID, accessabilities.profile_apply_photo).click()
        except NoSuchElementException:
            pass

        try:
            driver.find_element(By.ID, accessabilities.profile_save_changes).click()
        except NoSuchElementException:
            pass

        driver.refresh()
        time.sleep(10)

        try:
            driver.find_element(By.ID, accessabilities.profile_cover_open).click()
        except NoSuchElementException:
            pass

        try:
            assert (driver.find_element(By.CSS_SELECTOR, accessabilities.image_1_css_selector).is_displayed())
        except NoSuchElementException:
            pass

        end_driver(driver)

    def test_profile_photo_change_discarded(self):
        driver = TestHomePage.sign_in(self)
        try:
            driver.find_element(By.ID, accessabilities.profile_navbar).click()
        except NoSuchElementException:
            pass

        try:
            driver.find_element(By.ID, accessabilities.profile_edit_button).click()
        except NoSuchElementException:
            pass

        try:
            driver.find_element(By.ID, accessabilities.profile_add_photo_profile).click()
        except NoSuchElementException:
            pass

        time.sleep(2)
        pyautogui.write(os.getcwd() + "\images\imageabcde1.png", interval=0.05)
        pyautogui.press('return')
        time.sleep(2)

        try:
            driver.find_element(By.ID, accessabilities.profile_apply_photo).click()
        except NoSuchElementException:
            pass

        try:
            driver.find_element(By.ID, accessabilities.profile_close_edit).click()
        except NoSuchElementException:
            pass

        try:
            driver.find_element(By.ID, accessabilities.profile_discard_changes).click()
        except NoSuchElementException:
            pass

        driver.refresh()
        time.sleep(10)

        try:
            driver.find_element(By.ID, accessabilities.profile_photo_open).click()
        except NoSuchElementException:
            pass

        try:
            assert ((driver.find_element(By.CSS_SELECTOR,
                                         accessabilities.image_1_css_selector).is_displayed()) is False)
        except NoSuchElementException:
            pass

        end_driver(driver)

    def test_cover_photo_remove(self):
        driver = TestHomePage.sign_in(self)
        try:
            driver.find_element(By.ID, accessabilities.profile_navbar).click()
        except NoSuchElementException:
            pass

        try:
            driver.find_element(By.ID, accessabilities.profile_edit_button).click()
        except NoSuchElementException:
            pass

        try:
            driver.find_element(By.ID, accessabilities.profile_remove_cover_photo).click()
        except NoSuchElementException:
            pass


        try:
            driver.find_element(By.ID, accessabilities.profile_save_changes).click()
        except NoSuchElementException:
            pass

        driver.refresh()
        time.sleep(10)

        try:
            assert((driver.find_element(By.ID, accessabilities.profile_cover_open).is_displayed()) is False)
        except NoSuchElementException:
            pass

        end_driver(driver)
