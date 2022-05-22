import accessabilities
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException
import time
from conftest import start_driver
from conftest import end_driver
import string
import random
import pytest


def sign_in_user_2(driver):
    # login to admin page
    try:
        driver.find_element(By.ID, accessabilities.sign_in_button_id).click()
    except NoSuchElementException:
        pass

    try:
        driver.find_element(By.ID, accessabilities.sign_in_email_textbox_id).send_keys(
            accessabilities.user_2_username)
    except NoSuchElementException:
        pass

    try:
        driver.find_element(By.ID, accessabilities.sign_in_next_button).click()
    except NoSuchElementException:
        pass

    try:
        driver.find_element(By.ID, accessabilities.sign_in_password_textbox_id).send_keys(
            accessabilities.user_2_password)
    except NoSuchElementException:
        pass

    try:
        driver.find_element(By.ID, accessabilities.sign_in_login_button_id).click()
    except NoSuchElementException:
        pass
    time.sleep(2)
    return driver


def sign_in_user_1(driver):
    # login to admin page
    try:
        driver.find_element(By.ID, accessabilities.sign_in_button_id).click()
    except NoSuchElementException:
        pass

    try:
        driver.find_element(By.ID, accessabilities.sign_in_email_textbox_id).send_keys(
            accessabilities.user_1_username)
    except NoSuchElementException:
        pass

    try:
        driver.find_element(By.ID, accessabilities.sign_in_next_button).click()
    except NoSuchElementException:
        pass

    try:
        driver.find_element(By.ID, accessabilities.sign_in_password_textbox_id).send_keys(
            accessabilities.user_1_password)
    except NoSuchElementException:
        pass

    try:
        driver.find_element(By.ID, accessabilities.sign_in_login_button_id).click()
    except NoSuchElementException:
        pass
    time.sleep(2)
    return driver


def tweet(driver):
    # send a random tweet each time
    s = 10
    ran = ''.join(random.choices(string.ascii_uppercase + string.digits, k=s))
    try:
        driver.find_element(By.ID, accessabilities.tweet_box_id).send_keys(ran)
    except NoSuchElementException:
        pass

    try:
        driver.find_element(By.ID, accessabilities.whisp_button_id).click()
    except NoSuchElementException:
        pass
    time.sleep(2)
    return driver


class TestNotification:
    def test_liked_tweet_notification(self):
        driver = start_driver()
        # sign in user 1
        driver = sign_in_user_1(driver)
        # go to notifications page
        try:
            driver.find_element(By.CSS_SELECTOR, accessabilities.notification_page_on_navbar).click()
        except NoSuchElementException:
            pass
        time.sleep(1)
        # count number of 'user 2 liked your tweet' is shown
        body_text = driver.find_element(By.TAG_NAME, 'body').text
        num = body_text.count('@mernayoussef liked your Tweet')
        # go to homepage
        try:
            driver.find_element(By.CSS_SELECTOR, accessabilities.homepage_on_navbar).click()
        except NoSuchElementException:
            pass
        time.sleep(1)
        # user 1 tweets
        driver = tweet(driver)
        # sign out
        try:
            driver.find_element(By.CSS_SELECTOR, accessabilities.notifications_log_out_button).click()
        except NoSuchElementException:
            pass
        # sign in user 2
        driver = sign_in_user_2(driver)
        # user 2 likes user 1 tweet
        try:
            driver.find_element(By.CSS_SELECTOR, accessabilities.like_tweet_button).click()
        except NoSuchElementException:
            pass
        time.sleep(1)
        # sign out
        try:
            driver.find_element(By.CSS_SELECTOR, accessabilities.notifications_log_out_button).click()
        except NoSuchElementException:
            pass
        # sign in user 1
        driver = sign_in_user_1(driver)
        # open notification page
        try:
            driver.find_element(By.CSS_SELECTOR, accessabilities.notification_page_on_navbar).click()
        except NoSuchElementException:
            pass
        time.sleep(1)
        # assert user 2 username liked your tweet is present

        assert body_text.count('@mernayoussef liked your Tweet') is num + 1

        end_driver(driver)


    def test_retweet_notification(self):
        driver = start_driver()
        # sign in user 1
        driver = sign_in_user_1(driver)
        # go to notifications page
        try:
            driver.find_element(By.CSS_SELECTOR, accessabilities.notification_page_on_navbar).click()
        except NoSuchElementException:
            pass
        time.sleep(1)
        # count number of 'user 2 liked your tweet' is shown
        body_text = driver.find_element(By.TAG_NAME, 'body').text
        num = body_text.count('@mernayoussef retweeted your Tweet')
        # go to homepage
        try:
            driver.find_element(By.CSS_SELECTOR, accessabilities.homepage_on_navbar).click()
        except NoSuchElementException:
            pass
        time.sleep(1)
        # user 1 tweets
        driver = tweet(driver)
        # sign out
        try:
            driver.find_element(By.CSS_SELECTOR, accessabilities.notifications_log_out_button).click()
        except NoSuchElementException:
            pass
        # sign in user 2
        driver = sign_in_user_2(driver)
        # user 2 retweets user 1 tweet
        try:
            driver.find_element(By.CSS_SELECTOR, accessabilities.retweet_button).click()
        except NoSuchElementException:
            pass
        time.sleep(1)
        # sign out
        try:
            driver.find_element(By.CSS_SELECTOR, accessabilities.notifications_log_out_button).click()
        except NoSuchElementException:
            pass
        # sign in user 1
        driver = sign_in_user_1(driver)
        # open notification page
        try:
            driver.find_element(By.CSS_SELECTOR, accessabilities.notification_page_on_navbar).click()
        except NoSuchElementException:
            pass
        time.sleep(2)
        # assert user 2 username liked your tweet is present
        assert body_text.count('@mernayoussef retweeted your Tweet') is num + 1

        end_driver(driver)

    def test_reply_tweet_notification(self):
        driver = start_driver()
        # sign in user 1
        driver = sign_in_user_1(driver)
        # go to notifications page
        try:
            driver.find_element(By.CSS_SELECTOR, accessabilities.notification_page_on_navbar).click()
        except NoSuchElementException:
            pass
        time.sleep(1)
        # count number of 'user 2 liked your tweet' is shown
        body_text = driver.find_element(By.TAG_NAME, 'body').text
        num = body_text.count('@mernayoussef retweeted your Tweet')
        # go to homepage
        try:
            driver.find_element(By.CSS_SELECTOR, accessabilities.homepage_on_navbar).click()
        except NoSuchElementException:
            pass
        time.sleep(1)
        # user 1 tweets
        driver = tweet(driver)
        # sign out
        try:
            driver.find_element(By.CSS_SELECTOR, accessabilities.notifications_log_out_button).click()
        except NoSuchElementException:
            pass
        # sign in user 2
        driver = sign_in_user_2(driver)
        # user 2 replies to user 1 tweet
        try:
            driver.find_element(By.CSS_SELECTOR, accessabilities.reply_tweet_button).click()
        except NoSuchElementException:
            pass
        time.sleep(1)
        # sign out
        try:
            driver.find_element(By.CSS_SELECTOR, accessabilities.notifications_log_out_button).click()
        except NoSuchElementException:
            pass
        # sign in user 1
        driver = sign_in_user_1(driver)
        # open notification page
        try:
            driver.find_element(By.CSS_SELECTOR, accessabilities.notification_page_on_navbar).click()
        except NoSuchElementException:
            pass
        time.sleep(2)
        # assert user 2 username liked your tweet is present
        body_text = driver.find_element(By.TAG_NAME, 'body').text
        num = len(body_text)

        assert body_text.count('@mernayoussef replied to your Tweet') is num + 1

        end_driver(driver)
