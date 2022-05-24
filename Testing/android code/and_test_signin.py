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


def back_to_start_page(WebDriver):
    try:
        WebDriver.find_element(by=AppiumBy.XPATH, value=and_accessabilities.login_back_button_xpath).click()
    except NoSuchElementException:
        pass
    time.sleep(4)


def press_done_text(WebDriver):
    tweet_press = ActionChains(WebDriver)
    tweet_press.w3c_actions = ActionBuilder(WebDriver, mouse=PointerInput(interaction.POINTER_TOUCH, "touch"))
    tweet_press.w3c_actions.pointer_action.move_to_location(x=1317, y=2274)
    tweet_press.w3c_actions.pointer_action.click()
    tweet_press.w3c_actions.perform()
    time.sleep(4)


def test_wrong_username(WebDriver):
    # OPEN SIGN IN PAGE
    try:
        WebDriver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value=and_accessabilities.sign_in_button_id).click()
    except NoSuchElementException:
        pass
    time.sleep(5)
    # WRONG USERNAME
    try:
        WebDriver.find_element(by=AppiumBy.XPATH, value=and_accessabilities.login_mail_xpath).click()
        WebDriver.find_element(by=AppiumBy.XPATH, value=and_accessabilities.login_mail_xpath).clear()
        WebDriver.find_element(by=AppiumBy.XPATH, value=and_accessabilities.login_mail_xpath).send_keys("#ABDC")
    except NoSuchElementException:
        pass
    # VALID PASSWORD
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
    # CHECK THE ERROR MESSAGE
    test = False

    try:
        test = (WebDriver.find_element(by=AppiumBy.ACCESSIBILITY_ID,
                                       value=and_accessabilities.login_mail_error_id).is_displayed())
    except NoSuchElementException:
        pass
    print("WRONG MAIL LOGIN")
    if test:
        print('Test Successful')
    else:
        print('Test Failed')

    back_to_start_page(WebDriver)


def test_wrong_password(WebDriver):
    # SIGN IN BUTTON
    try:
        WebDriver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value=and_accessabilities.sign_in_button_id).click()
    except NoSuchElementException:
        pass
    time.sleep(5)
    # VALID MAIL
    try:
        WebDriver.find_element(by=AppiumBy.XPATH, value=and_accessabilities.login_mail_xpath).click()
        WebDriver.find_element(by=AppiumBy.XPATH, value=and_accessabilities.login_mail_xpath).clear()
        WebDriver.find_element(by=AppiumBy.XPATH, value=and_accessabilities.login_mail_xpath).send_keys(
            and_accessabilities.username)
    except NoSuchElementException:
        pass
    # INVALID PASSWORD
    try:
        WebDriver.find_element(by=AppiumBy.XPATH, value=and_accessabilities.login_password_xpath).click()
        WebDriver.find_element(by=AppiumBy.XPATH, value=and_accessabilities.login_password_xpath).send_keys("!am11")
    except NoSuchElementException:
        pass
    # NEXT BUTTON
    press_done_text(WebDriver)
    try:
        WebDriver.find_element(by=AppiumBy.XPATH, value=and_accessabilities.login_button_xpath).click()
    except NoSuchElementException:
        pass
    time.sleep(4)
    # CHECK THE ERROR MESSAGE
    test = False

    try:
        test = (WebDriver.find_element(by=AppiumBy.ACCESSIBILITY_ID,
                                       value=and_accessabilities.login_password_error_id).is_displayed())
    except NoSuchElementException:
        pass
    print("WRONG PASSWORD LOGIN")
    if test:
        print('Test Successful')
    else:
        print('Test Failed')

    back_to_start_page(WebDriver)


def test_empty_username(WebDriver):
    # SIGN IN BUTTON
    try:
        WebDriver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value=and_accessabilities.sign_in_button_id).click()
    except NoSuchElementException:
        pass
    time.sleep(5)
    # EMPTY MAIL
    try:
        WebDriver.find_element(by=AppiumBy.XPATH, value=and_accessabilities.login_mail_xpath).click()
        WebDriver.find_element(by=AppiumBy.XPATH, value=and_accessabilities.login_mail_xpath).clear()
        WebDriver.find_element(by=AppiumBy.XPATH, value=and_accessabilities.login_mail_xpath).send_keys("")
    except NoSuchElementException:
        pass
    # VALID PASSWORD
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
    # CHECK THE ERROR MESSAGE
    test = False

    try:
        test = (WebDriver.find_element(by=AppiumBy.ACCESSIBILITY_ID,
                                       value=and_accessabilities.login_mail_error_id).is_displayed())
    except NoSuchElementException:
        pass
    print("EMPTY USERNAME LOGIN")
    if test:
        print('Test Successful')
    else:
        print('Test Failed')

    back_to_start_page(WebDriver)


def test_empty_password(WebDriver):
    # SIGN IN BUTTON
    try:
        WebDriver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value=and_accessabilities.sign_in_button_id).click()
    except NoSuchElementException:
        pass
    time.sleep(5)
    # VALID MAIL
    try:
        WebDriver.find_element(by=AppiumBy.XPATH, value=and_accessabilities.login_mail_xpath).click()
        WebDriver.find_element(by=AppiumBy.XPATH, value=and_accessabilities.login_mail_xpath).clear()
        WebDriver.find_element(by=AppiumBy.XPATH, value=and_accessabilities.login_mail_xpath).send_keys(
            and_accessabilities.username)
    except NoSuchElementException:
        pass
    # EMPTY PASSWORD
    try:
        WebDriver.find_element(by=AppiumBy.XPATH, value=and_accessabilities.login_password_xpath).click()
        WebDriver.find_element(by=AppiumBy.XPATH, value=and_accessabilities.login_password_xpath).send_keys("")
    except NoSuchElementException:
        pass
    # NEXT BUTTON
    press_done_text(WebDriver)
    try:
        WebDriver.find_element(by=AppiumBy.XPATH, value=and_accessabilities.login_button_xpath).click()
    except NoSuchElementException:
        pass
    time.sleep(4)
    # CHECK THE ERROR MESSAGE
    test = False

    try:
        test = (WebDriver.find_element(by=AppiumBy.ACCESSIBILITY_ID,
                                       value=and_accessabilities.login_password_error_id).is_displayed())
    except NoSuchElementException:
        pass
    print("EMPTY PASSWORD LOGIN")
    if test:
        print('Test Successful')
    else:
        print('Test Failed')

    back_to_start_page(WebDriver)


def test_empty_password_and_mail(WebDriver):
    # SIGN IN BUTTON
    try:
        WebDriver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value=and_accessabilities.sign_in_button_id).click()
    except NoSuchElementException:
        pass
    time.sleep(5)
    # EMPTY MAIL
    try:
        WebDriver.find_element(by=AppiumBy.XPATH, value=and_accessabilities.login_mail_xpath).click()
        WebDriver.find_element(by=AppiumBy.XPATH, value=and_accessabilities.login_mail_xpath).clear()
        WebDriver.find_element(by=AppiumBy.XPATH, value=and_accessabilities.login_mail_xpath).send_keys("")
    except NoSuchElementException:
        pass
    # EMPTY PASSWORD
    try:
        WebDriver.find_element(by=AppiumBy.XPATH, value=and_accessabilities.login_password_xpath).click()
        WebDriver.find_element(by=AppiumBy.XPATH, value=and_accessabilities.login_password_xpath).send_keys("")
    except NoSuchElementException:
        pass
    # NEXT BUTTON
    press_done_text(WebDriver)
    try:
        WebDriver.find_element(by=AppiumBy.XPATH, value=and_accessabilities.login_button_xpath).click()
    except NoSuchElementException:
        pass
    time.sleep(4)
    # CHECK THE ERROR MESSAGE
    test = False

    try:
        test = (WebDriver.find_element(by=AppiumBy.ACCESSIBILITY_ID,
                                       value=and_accessabilities.login_password_error_id).is_displayed() and WebDriver.find_element(
            by=AppiumBy.ACCESSIBILITY_ID,
            value=and_accessabilities.login_mail_error_id).is_displayed())
    except NoSuchElementException:
        pass
    print("EMPTY MAIL AND PASSWORD LOGIN")
    if test:
        print('Test Successful')
    else:
        print('Test Failed')

    back_to_start_page(WebDriver)


def test_valid_mail_and_password(WebDriver):
    # SIGN IN BUTTON
    try:
        WebDriver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value=and_accessabilities.sign_in_button_id).click()
    except NoSuchElementException:
        pass
    time.sleep(5)
    # EMPTY MAIL
    try:
        WebDriver.find_element(by=AppiumBy.XPATH, value=and_accessabilities.login_mail_xpath).click()
        WebDriver.find_element(by=AppiumBy.XPATH, value=and_accessabilities.login_mail_xpath).clear()
        WebDriver.find_element(by=AppiumBy.XPATH, value=and_accessabilities.login_mail_xpath).send_keys(
            and_accessabilities.username)
    except NoSuchElementException:
        pass
    # EMPTY PASSWORD
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
    # CHECK THE ERROR MESSAGE
    test = True

    try:
        test = (WebDriver.find_element(by=AppiumBy.XPATH,
                                       value=and_accessabilities.login_page_xpath).is_displayed())
    except NoSuchElementException:
        pass

    print("VALID LOGIN")
    if test:
        print('Test Failed')
    else:
        print('Test Successful')

    back_to_start_page(WebDriver)
