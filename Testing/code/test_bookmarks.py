import accessabilities
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException
import time
import pytest
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
            driver.find_element(By.CSS_SELECTOR, accessabilities.bookmarks_option).click()
        except NoSuchElementException:
            pass

        time.sleep(2)
        driver.refresh()

        try:
            driver.find_element(By.CSS_SELECTOR, accessabilities.bookmarks_navbar_button).click()
        except NoSuchElementException:
            pass

        time.sleep(2)
        text = driver.page_source

        assert tweet in text
        end_driver(driver)

    #def test_add_bookmarks_image():
    #def test_add-bookmark_gif();

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
            pass

        try:
            driver.find_element(By.CSS_SELECTOR, accessabilities.bookmarked_tweet_options).click()
        except NoSuchElementException:
            pass

        try:
            driver.find_element(By.ID, accessabilities.bookmark_remove_tweet).click()
        except NoSuchElementException:
            pass

        time.sleep(2)
        driver.refresh()

        text = driver.page_source

        if tweet in text:
            assert False
        else:
            assert True
        end_driver(driver)
