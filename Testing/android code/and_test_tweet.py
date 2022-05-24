from appium import webdriver
from appium.webdriver import appium_service
from appium.webdriver.appium_service import AppiumService
import time
from selenium.common.exceptions import NoSuchElementException
import and_accessabilities
import and_conftest
from appium.webdriver.common.appiumby import AppiumBy
from selenium.webdriver import ActionChains
from selenium.webdriver.common.actions import interaction
from selenium.webdriver.common.actions.action_builder import ActionBuilder
from selenium.webdriver.common.actions.pointer_input import PointerInput
import pytest

def press_select_photo(WebDriver):
    tweet_press = ActionChains(WebDriver)
    tweet_press.w3c_actions = ActionBuilder(WebDriver, mouse=PointerInput(interaction.POINTER_TOUCH, "touch"))
    tweet_press.w3c_actions.pointer_action.move_to_location(x=265, y=400)
    tweet_press.w3c_actions.pointer_action.click()
    tweet_press.w3c_actions.perform()
    time.sleep(4)

class TestTweet:
    def test_tweet_text(self):
        WebDriver = and_conftest.start_up()
        #Tweeting
        try:
            WebDriver.find_element(by=AppiumBy.XPATH, value=and_accessabilities.tweet_box_xpath).click()
            WebDriver.find_element(by=AppiumBy.XPATH, value=and_accessabilities.tweet_box_xpath).send_keys('Tweeeeeeet#1')
        except NoSuchElementException:
            pass
        try:
            WebDriver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value=and_accessabilities.tweet_id).click()
        except NoSuchElementException:
            pass
        time.sleep(5)

        #Check tweet
        try:
            assert (WebDriver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value='android.widget.mernatamer.Tweeeeeeet#1').is_displayed())
        except NoSuchElementException:
            pass

        and_conftest.teardownapp(WebDriver)

    def test_tweet_text_with_image(self):
        WebDriver = and_conftest.start_up()
        # Tweeting
        try:
            WebDriver.find_element(by=AppiumBy.XPATH, value=and_accessabilities.tweet_box_xpath).click()
            WebDriver.find_element(by=AppiumBy.XPATH, value=and_accessabilities.tweet_box_xpath).send_keys(
                'Tweeeeeeet#1')
        except NoSuchElementException:
            pass
        try:
            WebDriver.find_element(by=AppiumBy.XPATH, value=and_accessabilities.tweet_box_image_xpath).click()
        except NoSuchElementException:
            pass

        try:
            press_select_photo(WebDriver)
        except NoSuchElementException:
            pass

        try:
            WebDriver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value=and_accessabilities.tweet_id).click()
        except NoSuchElementException:
            pass
        time.sleep(5)

        # Check tweet
        try:
            assert (WebDriver.find_element(by=AppiumBy.ACCESSIBILITY_ID,
                                           value='android.widget.mernatamer.image').is_displayed())
        except NoSuchElementException:
            pass

        and_conftest.teardownapp(WebDriver)