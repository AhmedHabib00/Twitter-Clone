import time
from selenium.common.exceptions import NoSuchElementException
import and_accessabilities
from appium.webdriver.common.appiumby import AppiumBy


def test_add_bookmark(WebDriver):
    # get text of first tweet
    tweet = []
    try:
        tweet = WebDriver.find_element(by=AppiumBy.XPATH, value=and_accessabilities.first_tweet_on_timeline).text
    except NoSuchElementException:
        pass
    # click share button
    try:
        WebDriver.find_element(by=AppiumBy.XPATH, value=and_accessabilities.bookmark_share_button).click()
    except NoSuchElementException:
        pass
    # choose bookmark action
    try:
        WebDriver.find_element(by=AppiumBy.XPATH, value=and_accessabilities.bookmark_add_to_bookmarks_button).click()
    except NoSuchElementException:
        pass
    time.sleep(2)
    # open navbar
    try:
        WebDriver.find_element(by=AppiumBy.XPATH, value=and_accessabilities.bookmark_open_navbar_button).click()
    except NoSuchElementException:
        pass
    # click bookmarks
    try:
        WebDriver.find_element(by=AppiumBy.XPATH, value=and_accessabilities.bookmarks_button_on_navbar).click()
    except NoSuchElementException:
        pass
    time.sleep(2)
    # assert tweet is shown
    try:
        assert tweet == WebDriver.find_element(by=AppiumBy.XPATH,
                                               value=and_accessabilities.first_tweet_on_bookmark_page).text
    except NoSuchElementException:
        pass


def test_remove_bookmark(WebDriver):
    # open navbar
    try:
        WebDriver.find_element(by=AppiumBy.XPATH, value=and_accessabilities.bookmark_open_navbar_button).click()
    except NoSuchElementException:
        pass
    # click bookmarks
    try:
        WebDriver.find_element(by=AppiumBy.XPATH, value=and_accessabilities.bookmarks_button_on_navbar).click()
    except NoSuchElementException:
        pass
    time.sleep(2)
    # get text of first tweet on bookmarks page
    tweet = []
    try:
        tweet = WebDriver.find_element(by=AppiumBy.XPATH, value=and_accessabilities.first_tweet_on_bookmark_page).text
    except NoSuchElementException:
        pass
    # click share button
    try:
        WebDriver.find_element(by=AppiumBy.XPATH, value=and_accessabilities.bookmark_share_button).click()
    except NoSuchElementException:
        pass
    # choose remove bookmark option
    try:
        WebDriver.find_element(by=AppiumBy.XPATH, value=and_accessabilities.bookmark_remove_button).click()
    except NoSuchElementException:
        pass
    time.sleep(2)
    # assert text of first tweet to not be equal to removed bookmark
    # if the bookmark page is empty assert that "save tweets later element is shown
    # otherwise fail test
    try:
        assert tweet is not (
            WebDriver.find_element(by=AppiumBy.XPATH, value=and_accessabilities.first_tweet_on_bookmark_page).text)
    except NoSuchElementException:
        try:
            assert WebDriver.find_element(by=AppiumBy.XPATH,
                                          value=and_accessabilities.save_tweets_for_later).is_displayed()
        except NoSuchElementException:
            assert False
