import time
from appium import webdriver
from appium.webdriver.appium_service import AppiumService


def start_up():
    desired_caps = dict(
        automationName="UiAutomator2",
        platformName="Android",
        deviceName="Pixel",
        appPackage="com.example.whisper",
        app='C:/Users/Merna/AndroidStudioProjects/Whisper\Android/build/app/outputs/apk/debug/app-debug.apk'
    )
    appium_service = AppiumService()
    appium_service.start()

    if appium_service.is_running:
        print('Appium Is Running')
    if appium_service.is_listening:
        print('appium_service.is_listening')

    WebDriver = webdriver.Remote("http://localhost:4723/wd/hub", desired_caps)
    time.sleep(10)
    return WebDriver


def teardowm(WebDriver):
    WebDriver.quit()


def teardownapp(WebDriver):
    WebDriver.close_app()


def start_app(WebDriver):
    WebDriver.activate_app('com.example.whisper')
    time.sleep(5)
