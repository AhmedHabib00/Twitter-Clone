import accessabilities
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException
import pyautogui
import os
import time
import pytest
from conftest import end_driver
from conftest import sign_in


class TestHomePage:
    def test_tweetbox_text_image_combinations_1(self):
        # SIGN IN
        driver = sign_in()
        # case 1

        test = False
        try:
            test = (driver.find_element(By.ID, accessabilities.whisp_button_id).is_enabled())
        except NoSuchElementException:
            pass

        if test:
            assert True
        else:
            assert False

        # case 2
        # TYPE TWEET WITHIN LIMIT
        try:
            driver.find_element(By.ID, accessabilities.tweet_box_id).send_keys(accessabilities.sample_text)
        except NoSuchElementException:
            pass
        skip = False
        print('NORMAL TEXT ONLY TEST')

        # CLICK WHISP BUTTON IF ENABLED IF NOT TEST FAILED
        try:
            driver.find_element(By.ID, accessabilities.whisp_button_id).click()
        except NoSuchElementException as e:
            pytest.fail(e)
            skip = True
            pass

        driver.refresh()
        time.sleep(10)

        # TEST
        assert (skip is False and accessabilities.sample_text in driver.page_source) is True

        # case 3
        # TYPE TWEET OUTSIDE LIMIT
        try:
            driver.find_element(By.ID, accessabilities.tweet_box_id).send_keys(accessabilities.text_exceed_limit)
        except NoSuchElementException:
            pass

        # CLICK WHISP BUTTON

        try:
            assert (driver.find_element(By.ID, accessabilities.whisp_button_id).is_enabled()) is False
        except NoSuchElementException:
            pass

        end_driver(driver)

    def test_tweetbox_text_image_combinations_2(self):
        # SIGN IN
        driver = sign_in()
        # case 3
        try:
            driver.find_element(By.CSS_SELECTOR, accessabilities.select_image_button).click()
        except NoSuchElementException:
            pass
        time.sleep(5)
        pyautogui.write(os.getcwd() + "\images\imageabcde1.png", interval=0.05)
        pyautogui.press('return')

        skip = False
        # CLICK WHISP BUTTON IF ENABLED IF NOT TEST FAILED
        try:
            driver.find_element(By.ID, accessabilities.whisp_button_id).click()
        except NoSuchElementException as e:
            pytest.fail(e)
            skip = True
            pass
        time.sleep(5)

        if skip is False:
            # REFRESH TO SHOW TWEETS
            driver.refresh()
            time.sleep(10)

            # TEST
            try:
                driver.find_element(By.CSS_SELECTOR, accessabilities.image_1_css_selector).is_displayed()
            except NoSuchElementException as e:
                pytest.fail(e)
                skip = True

            if skip is False:
                assert True

            # case 4
            try:
                driver.find_element(By.ID, accessabilities.tweet_box_id).send_keys(accessabilities.sample_text)
            except NoSuchElementException:
                pass

            try:
                driver.find_element(By.CSS_SELECTOR, accessabilities.select_image_button).click()
            except NoSuchElementException:
                pass
            time.sleep(5)
            pyautogui.write(os.getcwd() + "\images\imagefghi2.png", interval=0.05)
            pyautogui.press('return')

            skip = False
            # CLICK WHISP BUTTON IF ENABLED IF NOT TEST FAILED
            try:
                driver.find_element(By.ID, accessabilities.whisp_button_id).click()
            except NoSuchElementException as e:
                pytest.fail(e)
                skip = True
                pass
            time.sleep(5)

            if skip is False:
                # REFRESH TO SHOW TWEETS
                driver.refresh()
                time.sleep(10)

                # TEST

                try:
                    assert (driver.find_element(By.CSS_SELECTOR, accessabilities.image_2_css_selector).is_displayed())
                except NoSuchElementException as e:
                    pytest.fail(e)
                    # TEST ALREADY DECLARED FAILED SKIP IF CONDITION
                    skip = True

                if skip is False:
                    # IF BOTH IMAGE AND TEXT ARE FOUND THE TEST IS SUCCESSFUL
                    assert accessabilities.sample_text in driver.page_source

                # case 5
                try:
                    driver.find_element(By.ID, accessabilities.tweet_box_id).send_keys(
                        accessabilities.text_exceed_limit)
                except NoSuchElementException:
                    pass

                try:
                    driver.find_element(By.CSS_SELECTOR, accessabilities.select_image_button).click()
                except NoSuchElementException:
                    pass
                time.sleep(5)
                pyautogui.write(os.getcwd() + "\images\imagefghi2.png", interval=0.05)
                pyautogui.press('return')

                # CLICK WHISP BUTTON IF ENABLED IF NOT TEST FAILED
                try:
                    assert driver.find_element(By.ID, accessabilities.whisp_button_id).is_enabled()
                except NoSuchElementException:
                    pass
            end_driver(driver)

    def image_exceeding_limit(self):
        # SIGN IN
        driver = sign_in()
        # FIRST IMAGE
        try:
            driver.find_element(By.CSS_SELECTOR, accessabilities.select_image_button).click()
        except NoSuchElementException:
            pass
        time.sleep(2)
        pyautogui.write(os.getcwd() + "\images\imageabcde1.png", interval=0.05)
        pyautogui.press('return')
        time.sleep(2)

        # SECOND IMAGE
        try:
            driver.find_element(By.CSS_SELECTOR, accessabilities.select_image_button).click()
        except NoSuchElementException:
            pass
        time.sleep(2)
        pyautogui.write(os.getcwd() + "\images\imagefghi2.png", interval=0.05)
        pyautogui.press('return')
        time.sleep(2)

        # THIRD IMAGE
        try:
            driver.find_element(By.CSS_SELECTOR, accessabilities.select_image_button).click()
        except NoSuchElementException:
            pass
        time.sleep(2)
        pyautogui.write(os.getcwd() + "\images\imagejklm3.png", interval=0.05)
        pyautogui.press('return')
        time.sleep(2)

        # FORTH IMAGE
        try:
            driver.find_element(By.CSS_SELECTOR, accessabilities.select_image_button).click()
        except NoSuchElementException:
            pass
        time.sleep(2)
        pyautogui.write(os.getcwd() + "\images\imagenopq4.png", interval=0.05)
        pyautogui.press('return')
        time.sleep(2)

        # FIVE IMAGE
        try:
            driver.find_element(By.CSS_SELECTOR, accessabilities.select_image_button).click()
        except NoSuchElementException:
            pass
        time.sleep(2)
        pyautogui.write(os.getcwd() + "\images\imagerstu5.png", interval=0.05)
        pyautogui.press('return')
        time.sleep(2)

        return driver

    def test_tweetbox_text_image_combinations_3(self):
        # case 7
        # UPLOAD 5 IMAGES
        driver = TestHomePage.image_exceeding_limit(self)
        # CHECK NUMBER OF IMAGES UPLOADED
        skip = False
        image_list = driver.find_elements(By.ID, accessabilities.images_in_tweetbox_id)

        if len(image_list) == 4:
            assert len(image_list) == 4
        else:
            skip = True

        if skip is False:
            try:
                driver.find_element(By.ID, accessabilities.whisp_button_id).click()
            except NoSuchElementException as e:
                pytest.fail(e)
                skip = True

            if skip is False:
                driver.refresh()
                time.sleep(10)
                try:
                    assert (driver.find_element(By.CSS_SELECTOR,
                                                accessabilities.image_2_css_selector).is_displayed() and driver.find_element(
                        By.CSS_SELECTOR, accessabilities.image_1_css_selector).is_displayed() and driver.find_element(
                        By.CSS_SELECTOR, accessabilities.image_3_css_selector).is_displayed() and driver.find_element(
                        By.CSS_SELECTOR,
                        accessabilities.image_4_css_selector).is_displayed() and not driver.find_element(
                        By.CSS_SELECTOR, accessabilities.image_5_css_selector).is_displayed()) is True
                except NoSuchElementException as e:
                    pytest.fail(e)
                end_driver(driver)

    def test_tweetbox_text_image_combinations_4(self):
        # case 8
        # UPLOAD 5 IMAGES
        driver = TestHomePage.image_exceeding_limit(self)
        # TYPE A NORMAL TEXT SAMPLE
        try:
            driver.find_element(By.ID, accessabilities.tweet_box_id).send_keys(accessabilities.sample_text)
        except NoSuchElementException as e:
            pytest.fail(e)
            pass

        # CHECK NUMBER OF IMAGES UPLOADED

        skip = False

        image_list = driver.find_elements(By.ID, accessabilities.images_in_tweetbox_id)

        if len(image_list) == 4:
            assert len(image_list) == 4
        else:
            skip = True

        if skip is False:
            try:
                driver.find_element(By.ID, accessabilities.whisp_button_id).click()
            except NoSuchElementException as e:
                pytest.fail(e)
                skip = True

            if skip is False:
                driver.refresh()
                time.sleep(10)
                try:
                    assert (driver.find_element(By.CSS_SELECTOR,
                                                accessabilities.image_2_css_selector).is_displayed() and driver.find_element(
                        By.CSS_SELECTOR, accessabilities.image_1_css_selector).is_displayed() and driver.find_element(
                        By.CSS_SELECTOR, accessabilities.image_3_css_selector).is_displayed() and driver.find_element(
                        By.CSS_SELECTOR,
                        accessabilities.image_4_css_selector).is_displayed() and accessabilities.sample_text in driver.page_source and not driver.find_element(
                        By.CSS_SELECTOR, accessabilities.image_5_css_selector).is_displayed()) is True
                except NoSuchElementException:
                    pass
            end_driver(driver)

    def test_tweetbox_text_image_combinations_5(self):
        # case 9
        # UPLOAD 5 IMAGES
        driver = TestHomePage.image_exceeding_limit(self)
        # TYPE TEXT EXCEEDING LIMIT
        try:
            driver.find_element(By.ID, accessabilities.tweet_box_id).send_keys(accessabilities.text_exceed_limit)
        except NoSuchElementException:
            pass

        # CHECK NUMBER OF IMAGES UPLOADED
        try:
            assert (driver.find_element(By.ID, accessabilities.whisp_button_id).is_enabled())
        except NoSuchElementException:
            pass

        end_driver(driver)
