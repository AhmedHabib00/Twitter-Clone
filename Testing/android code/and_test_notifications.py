import time
import string
import random
from selenium.common.exceptions import NoSuchElementException
import and_accessabilities
from appium.webdriver.common.appiumby import AppiumBy
from selenium.webdriver import ActionChains
from selenium.webdriver.common.actions import interaction
from selenium.webdriver.common.actions.action_builder import ActionBuilder
from selenium.webdriver.common.actions.pointer_input import PointerInput


def press_done_text(WebDriver):
    tweet_press = ActionChains(WebDriver)
    tweet_press.w3c_actions = ActionBuilder(WebDriver, mouse=PointerInput(interaction.POINTER_TOUCH, "touch"))
    tweet_press.w3c_actions.pointer_action.move_to_location(x=1317, y=2274)
    tweet_press.w3c_actions.pointer_action.click()
    tweet_press.w3c_actions.perform()
    time.sleep(4)


def sign_in_user_1(WebDriver):
    # SIGN IN BUTTON
    try:
        WebDriver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value=and_accessabilities.sign_in_button_id).click()
    except NoSuchElementException:
        pass
    time.sleep(5)
    # CORRECT EMAIL 1
    try:
        WebDriver.find_element(by=AppiumBy.XPATH, value=and_accessabilities.login_mail_xpath).click()
        WebDriver.find_element(by=AppiumBy.XPATH, value=and_accessabilities.login_mail_xpath).clear()
        WebDriver.find_element(by=AppiumBy.XPATH, value=and_accessabilities.login_mail_xpath).send_keys(
            and_accessabilities.username)
    except NoSuchElementException:
        pass
    # CORRECT PASSWORD 1
    try:
        WebDriver.find_element(by=AppiumBy.XPATH, value=and_accessabilities.login_password_xpath).click()
        WebDriver.find_element(by=AppiumBy.XPATH, value=and_accessabilities.login_password_xpath).send_keys(
            and_accessabilities.password)
    except NoSuchElementException:
        pass
    # NEXT BUTTON
    press_done_text(WebDriver)
    try:
        WebDriver.find_element(by=AppiumBy.XPATH, value=and_accessabilities.login_button_xpath).click()
    except NoSuchElementException:
        pass
    time.sleep(4)


def sign_in_user_2(WebDriver):
    # SIGN IN BUTTON
    try:
        WebDriver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value=and_accessabilities.sign_in_button_id).click()
    except NoSuchElementException:
        pass
    time.sleep(5)
    # CORRECT EMAIL 2
    try:
        WebDriver.find_element(by=AppiumBy.XPATH, value=and_accessabilities.login_mail_xpath).click()
        WebDriver.find_element(by=AppiumBy.XPATH, value=and_accessabilities.login_mail_xpath).clear()
        WebDriver.find_element(by=AppiumBy.XPATH, value=and_accessabilities.login_mail_xpath).send_keys(
            and_accessabilities.username2)
    except NoSuchElementException:
        pass
    # CORRECT PASSWORD 2
    try:
        WebDriver.find_element(by=AppiumBy.XPATH, value=and_accessabilities.login_password_xpath).click()
        WebDriver.find_element(by=AppiumBy.XPATH, value=and_accessabilities.login_password_xpath).send_keys(
            and_accessabilities.password2)
    except NoSuchElementException:
        pass
    # NEXT BUTTON
    press_done_text(WebDriver)
    try:
        WebDriver.find_element(by=AppiumBy.XPATH, value=and_accessabilities.login_button_xpath).click()
    except NoSuchElementException:
        pass
    time.sleep(4)


def tweet(WebDriver):
    pass


def logout(WebDriver):
    # open navbar
    try:
        WebDriver.find_element(by=AppiumBy.XPATH, value=and_accessabilities.open_navbar_button).click()
    except NoSuchElementException:
        pass
    # click  logout
    try:
        WebDriver.find_element(by=AppiumBy.XPATH, value=and_accessabilities.logout_button_on_navbar).click()
    except NoSuchElementException:
        pass
    pass


def test_liked_tweet_notification(WebDriver):
    # sign in to user 1
    sign_in_user_1(WebDriver)
    # tweet
    tweet(WebDriver)
    # log out
    logout(WebDriver)
    # sign in to user 2
    sign_in_user_2(WebDriver)
    # like tweet
    try:
        WebDriver.find_element(by=AppiumBy.XPATH, value=and_accessabilities.first_like_button_on_navbar).click()
    except NoSuchElementException:
        pass
    # log out
    logout(WebDriver)
    # sign in to user 1
    sign_in_user_1(WebDriver)
    # open notifications page
    try:
        WebDriver.find_element(by=AppiumBy.XPATH, value=and_accessabilities.notifications_button).click()
    except NoSuchElementException:
        pass
    time.sleep(2)
    # assert notification is shown
    try:
        assert "@yasmeen liked your tweet" == WebDriver.find_element(by=AppiumBy.XPATH,
                                                                     value=and_accessabilities.body_of_first_notification).text
    except NoSuchElementException:
        pass


def test_retweet_tweet_notification(WebDriver):
    # sign in to user 1
    sign_in_user_1(WebDriver)
    # tweet
    tweet(WebDriver)
    # log out
    logout(WebDriver)
    # sign in to user 2
    sign_in_user_2(WebDriver)
    # retweet
    try:
        WebDriver.find_element(by=AppiumBy.XPATH, value=and_accessabilities.first_retweet_button_on_navbar).click()
    except NoSuchElementException:
        pass
    # log out
    logout(WebDriver)
    # sign in to user 1
    sign_in_user_1(WebDriver)
    # open notifications page
    try:
        WebDriver.find_element(by=AppiumBy.XPATH, value=and_accessabilities.notifications_button).click()
    except NoSuchElementException:
        pass
    time.sleep(2)
    # assert notification is shown
    try:
        assert "@yasmeen retweeted your tweet" == WebDriver.find_element(by=AppiumBy.XPATH,
                                                                         value=and_accessabilities.body_of_first_notification).text
    except NoSuchElementException:
        pass


def test_reply_tweet_notification(WebDriver):
    # sign in to user 1
    sign_in_user_1(WebDriver)
    # tweet
    tweet(WebDriver)
    # log out
    logout(WebDriver)
    # sign in to user 2
    sign_in_user_2(WebDriver)
    # reply to tweet
    # generate random
    s = 10
    ran = ''.join(random.choices(string.ascii_uppercase + string.digits, k=s))
    # type
    try:
        WebDriver.find_element(by=AppiumBy.XPATH, value=and_accessabilities.reply_tweet_textbox).click()
        WebDriver.find_element(by=AppiumBy.XPATH, value=and_accessabilities.reply_tweet_textbox).clear()
        WebDriver.find_element(by=AppiumBy.XPATH, value=and_accessabilities.reply_tweet_textbox).send_keys(ran)
    except NoSuchElementException:
        pass
    # press reply
    try:
        WebDriver.find_element(by=AppiumBy.XPATH, value=and_accessabilities.reply_button_on_reply_page).click()
    except NoSuchElementException:
        pass
    # log out
    logout(WebDriver)
    # sign in to user 1
    sign_in_user_1(WebDriver)
    # open notifications page
    try:
        WebDriver.find_element(by=AppiumBy.XPATH, value=and_accessabilities.notifications_button).click()
    except NoSuchElementException:
        pass
    time.sleep(2)
    # assert notification is shown
    try:
        assert "@yasmeen replied to your tweet" == WebDriver.find_element(by=AppiumBy.XPATH,
                                                                          value=and_accessabilities.body_of_first_notification).text
    except NoSuchElementException:
        pass
