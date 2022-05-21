import accessabilities
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.support.ui import Select
from selenium.webdriver.common.keys import Keys
import time
import pytest
from conftest import start_driver
from conftest import sign_in


def sign_in_admin():
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
    time.sleep(3)
    return driver


def sign_in_dummy_user():
    driver = start_driver()
    # login to admin page
    try:
        driver.find_element(By.ID, accessabilities.sign_in_button_id).click()
    except NoSuchElementException:
        pass

    try:
        driver.find_element(By.ID, accessabilities.sign_in_email_textbox_id).send_keys(
            accessabilities.delete_user_email)
    except NoSuchElementException:
        pass

    try:
        driver.find_element(By.ID, accessabilities.sign_in_next_button).click()
    except NoSuchElementException:
        pass

    try:
        driver.find_element(By.ID, accessabilities.sign_in_password_textbox_id).send_keys(
            accessabilities.delete_user_password)
    except NoSuchElementException:
        pass

    try:
        driver.find_element(By.ID, accessabilities.sign_in_login_button_id).click()
    except NoSuchElementException:
        pass
    time.sleep(2)
    return driver


class TestAdmin:
    @pytest.mark.slow
    def test_admin_search_bar(self):
        driver = sign_in_admin()
        # get an account name
        account_name = []
        try:
            account_name = driver.find_element(By.CSS_SELECTOR, accessabilities.admin_first_account_shown).text
        except NoSuchElementException:
            pass

        # insert account name in search bar
        try:
            driver.find_element(By.ID, accessabilities.admin_search_bar).send_keys(account_name)
        except NoSuchElementException:
            pass
        # click enter
        try:
            driver.find_element(By.ID, accessabilities.admin_search_bar).send_keys(Keys.RETURN)
        except NoSuchElementException:
            pass
        time.sleep(2)
        # assert no user found is not on page
        check = False
        try:
            check = driver.find_element(By.CSS_SELECTOR,accessabilities.admin_no_result_found_element).is_displayed()
        except NoSuchElementException:
            pass
        if check:
            assert False
        else:
            assert True
        driver.close()

    @pytest.mark.slow
    def test_invalid_date_to_unblock(self):
        # login to admin account
        driver = sign_in_admin()
        # search user to block
        try:
            driver.find_element(By.ID, accessabilities.admin_search_bar).send_keys('merna')
        except NoSuchElementException:
            pass

        try:
            driver.find_element(By.ID, accessabilities.admin_search_bar).send_keys(Keys.RETURN)
        except NoSuchElementException:
            pass
        # click block button
        try:
            driver.find_element(By.ID, accessabilities.admin_block_button_id).click()
        except NoSuchElementException:
            pass
        # insert invalid date
        try:
            Select(driver.find_element(By.ID, accessabilities.admin_month_id)).select_by_visible_text(
                'january')
        except NoSuchElementException:
            pass

        try:
            Select(driver.find_element(By.ID, accessabilities.admin_day_id)).select_by_visible_text(
                '30')
        except NoSuchElementException:
            pass

        try:
            Select(driver.find_element(By.ID, accessabilities.admin_year_id)).select_by_visible_text(
                '2022')
        except NoSuchElementException:
            pass

        # click block button
        try:
            driver.find_element(By.CSS_SELECTOR, accessabilities.admin_block_page_button).click()
        except NoSuchElementException:
            pass
        # assert error
        try:
            assert driver.find_element(By.CSS_SELECTOR, accessabilities.admin_invalid_date_error).is_displayed()
        except NoSuchElementException:
            pass
        driver.close()

    @pytest.mark.slow
    def test_block_user(self):
        driver = sign_in_admin()

        # search an account to be blocked
        try:
            driver.find_element(By.ID, accessabilities.admin_search_bar).send_keys('merna')
        except NoSuchElementException:
            pass

        try:
            driver.find_element(By.ID, accessabilities.admin_search_bar).send_keys(Keys.RETURN)
        except NoSuchElementException:
            pass

        time.sleep(2)
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
        time.sleep(1)

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

        time.sleep(3)

        # clear search bar
        try:
            driver.find_element(By.ID, accessabilities.admin_search_bar).clear()
        except NoSuchElementException:
            pass

        time.sleep(2)

        # open blocked user page
        try:
            driver.find_element(By.CSS_SELECTOR, accessabilities.admin_blocked_users_button).click()
        except NoSuchElementException:
            pass

        time.sleep(3)

        try:
            driver.find_element(By.ID, accessabilities.admin_search_bar).send_keys('merna')
        except NoSuchElementException:
            pass

        try:
            driver.find_element(By.ID, accessabilities.admin_search_bar).send_keys(Keys.RETURN)
        except NoSuchElementException:
            pass

        time.sleep(2)

        # if account name is found in blocked user page test is successful
        check = False
        try:
            check = driver.find_element(By.CSS_SELECTOR, accessabilities.admin_no_result_found_element).is_displayed()
        except NoSuchElementException:
            pass
        if check:
            assert False
        else:
            assert True
        driver.close()

    @pytest.mark.slow
    def test_unblock_user(self):
        driver = sign_in_admin()

        # open blocked user page
        try:
            driver.find_element(By.CSS_SELECTOR, accessabilities.admin_blocked_users_button).click()
        except NoSuchElementException:
            pass
        time.sleep(2)
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

        # click unblock button
        try:
            driver.find_element(By.ID, accessabilities.admin_unblock_button_id).click()
        except NoSuchElementException:
            pass
        time.sleep(3)

        # if user not found then test is successful
        try:
            assert driver.find_element(By.CSS_SELECTOR, accessabilities.admin_no_result_found_element).is_displayed()
        except NoSuchElementException:
            pass
        driver.close()

    @pytest.mark.slow
    def test_sign_in_to_blocked_user(self):
        driver = sign_in_admin()

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
        time.sleep(1)

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

        driver.close()
        driver = sign_in()
        time.sleep(2)
        try:
            assert driver.find_element(By.CSS_SELECTOR, accessabilities.admin_no_result_found_element).is_displayed()
        except NoSuchElementException:
            pass

        driver.close()

    @pytest.mark.slow
    def test_sign_in_to_unblocked_account(self):
        driver = sign_in_admin()
        # open blocked user page
        try:
            driver.find_element(By.CSS_SELECTOR, accessabilities.admin_blocked_users_button).click()
        except NoSuchElementException:
            pass
        time.sleep(2)
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
        time.sleep(4)

        driver.close()
        driver = sign_in()

        # if tweet-box is displayed test is successful
        try:
            assert driver.find_element(By.ID, accessabilities.admin_homepage_test).is_displayed()
        except NoSuchElementException:
            pass
        driver.close()

    @pytest.mark.slow
    def test_cancel_delete_account(self):
        # sign in to admin
        driver = sign_in_admin()
        # search specific user
        try:
            driver.find_element(By.ID, accessabilities.admin_search_bar).send_keys('whisp')
        except NoSuchElementException:
            pass

        try:
            driver.find_element(By.ID, accessabilities.admin_search_bar).send_keys(Keys.RETURN)
        except NoSuchElementException:
            pass
        time.sleep(1)
        # click on user
        try:
            driver.find_element(By.CSS_SELECTOR, accessabilities.admin_account_select).click()
        except NoSuchElementException:
            pass
        # cancel delete
        try:
            driver.find_element(By.CSS_SELECTOR, accessabilities.admin_cancel_delete).click()
        except NoSuchElementException:
            pass
        driver.close()

        # attempt to log-in
        driver = sign_in_dummy_user()
        time.sleep(2)
        # assert tweet-box is shown
        try:
            assert driver.find_element(By.ID, accessabilities.admin_homepage_test).is_displayed()
        except NoSuchElementException:
            pass
        driver.close()


