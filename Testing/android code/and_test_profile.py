from selenium.common.exceptions import NoSuchElementException
import and_accessabilities
from appium.webdriver.common.appiumby import AppiumBy
from selenium.webdriver import ActionChains
from selenium.webdriver.common.actions import interaction
from selenium.webdriver.common.actions.action_builder import ActionBuilder
from selenium.webdriver.common.actions.pointer_input import PointerInput


def test_change_profile_pic(WebDriver):
    try:
        WebDriver.find_element(by=AppiumBy.XPATH, value=and_accessabilities.profile_edit_xpath).click()
    except NoSuchElementException:
        pass

    test = False

    try:
        test = (WebDriver.find_element(by=AppiumBy.XPATH,
                                       value=and_accessabilities.profile_change_cover_xpath).is_displayed())
    except NoSuchElementException:
        pass

    print("Profile Edit")
    if test:
        print('Test Failed')
    else:
        print('Test Successful')
