import pytest
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
import accessabilities


@pytest.fixture(autouse=True)
def driver(request):
    # initializing webdriver
    caps = DesiredCapabilities().CHROME
    caps["pageLoadStrategy"] = "none"
    s = Service(accessabilities.chrome_driver)
    chrome_options = Options()
    chrome_options.add_argument("--disable-notifications")
    chrome_options.add_experimental_option('excludeSwitches', ['enable-logging'])
    # chrome_options.headless = True
    driver = webdriver.Chrome(service=s, options=chrome_options, desired_capabilities=caps)
    driver.implicitly_wait(20)
    driver.maximize_window()
    driver.get('http://habibs.me/')

    if request.cls is not None:
        request.cls.driver = driver

    yield driver
    driver.quit()
