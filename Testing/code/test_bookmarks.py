import accessabilities
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException
import time
from conftest import sign_in
from conftest import end_driver


class TestBookmarks:
    def test_add_to_bookmarks(self):
        driver = sign_in()

        tweet = []

        try:
            tweet = driver.find_element(By.CSS_SELECTOR, accessabilities.bookmark_tweet_body).text
        except NoSuchElementException:
            pass

        try:
            driver.find_element(By.CSS_SELECTOR, accessabilities.bookmarks_share_button).click()
        except NoSuchElementException:
            pass

        try:
            driver.find_element(By.ID, accessabilities.bookmarks_option_id).click()
        except NoSuchElementException:
            pass

        time.sleep(2)
        driver.refresh()

        try:
            driver.find_element(By.CSS_SELECTOR, accessabilities.bookmarks_navbar_button).click()
        except NoSuchElementException:
            pass

        time.sleep(2)
        body_text = driver.find_element(By.TAG_NAME, 'body').text

        assert tweet in body_text
        end_driver(driver)

    def test_remove_bookmark(self):
        driver = sign_in()
        try:
            driver.find_element(By.CSS_SELECTOR, accessabilities.bookmarks_navbar_button).click()
        except NoSuchElementException:
            pass

        time.sleep(2)

        tweet = []

        try:
            tweet = driver.find_element(By.CSS_SELECTOR, accessabilities.bookmark_tweet_body).text
        except NoSuchElementException:
            assert False
            pass

        try:
            driver.find_element(By.CSS_SELECTOR, accessabilities.bookmark_share_button_on_page).click()
        except NoSuchElementException:
            pass

        try:
            driver.find_element(By.ID, accessabilities.bookmarks_option_id).click()
        except NoSuchElementException:
            pass

        time.sleep(2)
        driver.refresh()

        body_text = driver.find_element(By.TAG_NAME, 'body').text

        if tweet in body_text:
            assert False
        else:
            assert True
        end_driver(driver)
