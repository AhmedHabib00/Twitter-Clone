import accessabilities
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.support.ui import Select
from selenium.webdriver.common.keys import Keys
import time
import pytest
from conftest import start_driver
from conftest import sign_in
from conftest import end_driver


class TestAdmin:
    def sign_in_admin(self):
        driver = start_driver()
        # login to admin page
        try:
            driver.find_element(By.ID, accessabilities.sign_in_button_id).click()
        except NoSuchElementException:
            pass

        try:
            driver.find_element(By.ID, accessabilities.sign_in_email_textbox_id).send_keys(
                accessabilities.admin_username)
        except NoSuchElementException:
            pass

        try:
            driver.find_element(By.ID, accessabilities.sign_in_next_button).click()
        except NoSuchElementException:
            pass

        try:
            driver.find_element(By.ID, accessabilities.sign_in_password_textbox_id).send_keys(
                accessabilities.admin_password)
        except NoSuchElementException:
            pass

        try:
            driver.find_element(By.ID, accessabilities.sign_in_login_button_id).click()
        except NoSuchElementException:
            pass
        return driver

    @pytest.mark.slow
    def test_block_user(self):
        driver = TestAdmin.sign_in_admin(self)

        # search an account to be blocked
        try:
            driver.find_element(By.ID, accessabilities.admin_search_bar).send_keys('merna')
        except NoSuchElementException:
            pass

        try:
            driver.find_element(By.ID, accessabilities.admin_search_bar).send_keys(Keys.RETURN)
        except NoSuchElementException:
            pass

        # get account name to be blocked
        account_name = []
        try:
            account_name = driver.find_element(By.CSS_SELECTOR, accessabilities.admin_first_account_shown).text
        except NoSuchElementException:
            pass

        # click on block button
        try:
            driver.find_element(By.ID, accessabilities.admin_block_button_id).click()
        except NoSuchElementException:
            pass

        # decide date of unblocking
        try:
            Select(driver.find_element(By.ID, accessabilities.admin_month_id)).select_by_visible_text(
                'August')
        except NoSuchElementException:
            pass

        try:
            Select(driver.find_element(By.ID, accessabilities.admin_day_id)).select_by_visible_text(
                '30')
        except NoSuchElementException:
            pass

        try:
            Select(driver.find_element(By.ID, accessabilities.admin_year_id)).select_by_visible_text(
                '2023')
        except NoSuchElementException:
            pass

        # click block button
        try:
            driver.find_element(By.CSS_SELECTOR, accessabilities.admin_block_page_button).click()
        except NoSuchElementException:
            pass

        time.sleep(2)

        # open blocked user page
        try:
            driver.find_element(By.CSS_SELECTOR, accessabilities.admin_blocked_users_button).click()
        except NoSuchElementException:
            pass

        time.sleep(2)

        text = driver.page_source

        # if account name is found in blocked user page test is successful
        if account_name in text:
            assert True
        else:
            assert False
        end_driver(driver)

    @pytest.mark.slow
    def test_unblock_user(self):
        driver = TestAdmin.sign_in_admin(self)

        # open blocked user page
        try:
            driver.find_element(By.CSS_SELECTOR, accessabilities.admin_blocked_users_button).click()
        except NoSuchElementException:
            pass
        # search for blocked user
        try:
            driver.find_element(By.ID, accessabilities.admin_search_bar).send_keys('merna')
        except NoSuchElementException:
            pass
        try:
            driver.find_element(By.ID, accessabilities.admin_search_bar).send_keys(Keys.RETURN)
        except NoSuchElementException:
            pass
        time.sleep(2)

        # get account name
        account_name = []
        try:
            account_name = driver.find_element(By.CSS_SELECTOR, accessabilities.admin_first_account_shown).text
        except NoSuchElementException:
            pass

        # click unblock button
        try:
            driver.find_element(By.ID, accessabilities.admin_unblock_button_id).click()
        except NoSuchElementException:
            pass
        time.sleep(2)

        # clear search bar
        try:
            driver.find_element(By.ID, accessabilities.admin_search_bar).clear()
        except NoSuchElementException:
            pass
        time.sleep(2)

        # search for blocked user again
        try:
            driver.find_element(By.ID, accessabilities.admin_search_bar).send_keys('merna')
        except NoSuchElementException:
            pass
        time.sleep(1)
        text = driver.page_source

        # if user not found then test is successful
        assert (account_name not in text)

    @pytest.mark.slow
    def sign_in_to_blocked_user(self):
        driver = TestAdmin.sign_in_admin(self)

        # search an account to be blocked
        try:
            driver.find_element(By.ID, accessabilities.admin_search_bar).send_keys('yasmeen')
        except NoSuchElementException:
            pass

        try:
            driver.find_element(By.ID, accessabilities.admin_search_bar).send_keys(Keys.RETURN)
        except NoSuchElementException:
            pass

        # click on block button
        try:
            driver.find_element(By.ID, accessabilities.admin_block_button_id).click()
        except NoSuchElementException:
            pass

        # decide date of unblocking
        try:
            Select(driver.find_element(By.ID, accessabilities.admin_month_id)).select_by_visible_text(
                'August')
        except NoSuchElementException:
            pass

        try:
            Select(driver.find_element(By.ID, accessabilities.admin_day_id)).select_by_visible_text(
                '30')
        except NoSuchElementException:
            pass

        try:
            Select(driver.find_element(By.ID, accessabilities.admin_year_id)).select_by_visible_text(
                '2023')
        except NoSuchElementException:
            pass

        # click block button
        try:
            driver.find_element(By.CSS_SELECTOR, accessabilities.admin_block_page_button).click()
        except NoSuchElementException:
            pass

        time.sleep(2)

        driver = sign_in()

        assert 'user not found ' in driver.page_source

    @pytest.mark.slow
    def test_sign_in_to_unblocked_account(self):
        driver = TestAdmin.sign_in_admin(self)
        # open blocked user page
        try:
            driver.find_element(By.CSS_SELECTOR, accessabilities.admin_blocked_users_button).click()
        except NoSuchElementException:
            pass
        # search for blocked user
        try:
            driver.find_element(By.ID, accessabilities.admin_search_bar).send_keys('yasmeen')
        except NoSuchElementException:
            pass
        try:
            driver.find_element(By.ID, accessabilities.admin_search_bar).send_keys(Keys.RETURN)
        except NoSuchElementException:
            pass
        time.sleep(2)
        # click unblock button
        try:
            driver.find_element(By.ID, accessabilities.admin_unblock_button_id).click()
        except NoSuchElementException:
            pass
        time.sleep(2)

        driver = sign_in()

        # if tweetbox is displayed test is successful
        try:
            assert driver.find_element(By.ID, accessabilities.admin_homepage_test).is_displayed()
        except NoSuchElementException:
            pass
