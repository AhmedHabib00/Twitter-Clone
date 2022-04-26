import time
import and_conftest
import and_test_signin
import and_test_signup
from appium import webdriver
from appium.webdriver import appium_service
from appium.webdriver.appium_service import AppiumService

#SIGN IN TESTS
WebDriver=and_conftest.start_up()

and_test_signin.test_wrong_username(WebDriver)
and_test_signin.test_wrong_password(WebDriver)
#and_conftest.start_app(driver)
and_test_signin.test_empty_username(WebDriver)
#and_conftest.start_app(driver)
and_test_signin.test_empty_password(WebDriver)
#and_conftest.start_app(driver)
and_test_signin.test_empty_password_and_mail(WebDriver)
print("SIGN IN TESTS ENDED")

#SIGN UP TESTS
and_test_signup.test_signup_invalid_empty_data(WebDriver)
and_test_signup.test_empty_password_and_date(WebDriver)
and_test_signup.test_empty_date(WebDriver)
and_test_signup.test_valid_data(WebDriver)
print("SIGN UP TESTS ENDED")



