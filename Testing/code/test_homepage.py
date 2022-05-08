import accessabilities
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException
import pyautogui
import os
import time


class TestHomePage:
    def sign_in(self):
        # LOGIN
        try:
            self.driver.find_element(By.ID, accessabilities.sign_in_button_id).click()
        except NoSuchElementException:
            pass

        try:
            self.driver.find_element(By.ID, accessabilities.sign_in_email_textbox_id).send_keys(
                accessabilities.username)
        except NoSuchElementException:
            pass

        try:
            self.driver.find_element(By.ID, accessabilities.sign_in_next_button).click()
        except NoSuchElementException:
            pass

        try:
            self.driver.find_element(By.ID, accessabilities.sign_in_password_textbox_id).send_keys(
                accessabilities.password)
        except NoSuchElementException:
            pass

        try:
            self.driver.find_element(By.ID, accessabilities.sign_in_login_button_id).click()
        except NoSuchElementException:
            pass
        driver = self.driver
        return driver

    def test_tweetbox_text_image_combinations_1(self):
        # SIGN IN
        driver = TestHomePage.sign_in()

        # case 1
        test = False
        try:
            test = (driver.find_element(By.ID, accessabilities.whisp_button_id).is_enabled())
        except NoSuchElementException:
            pass

        print('EMPTY TWEET TEST')

        if test:
            print('Test Failed')
        else:
            print("Test Successful")

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
        except NoSuchElementException:
            print("Test Failed")
            skip = True
            pass

        driver.refresh()
        time.sleep(10)

        # TEST
        if skip is False and accessabilities.sample_text in driver.page_source:
            print("Test Successful")
        else:
            if skip is False:
                print('Test Failed')

        # case 3
        # TYPE TWEET OUTSIDE LIMIT
        try:
            driver.find_element(By.ID, accessabilities.tweet_box_id).send_keys(accessabilities.text_exceed_limit)
        except NoSuchElementException:
            pass

        print('TEXT EXCEEDING LIMIT TEST')

        # CLICK WHISP BUTTON
        test = False

        try:
            test = (driver.find_element(By.ID, accessabilities.whisp_button_id).is_enabled())
        except NoSuchElementException:
            pass

        # TEST
        if test:
            print('Test Failed')
        else:
            print("Test Successful")

    def test_tweetbox_text_image_combinations_2(self):
        # SIGN IN
        driver = TestHomePage.sign_in()
        # case 3
        try:
            driver.find_element(By.CSS_SELECTOR, accessabilities.select_image_button).click()
        except NoSuchElementException:
            pass
        time.sleep(5)
        pyautogui.write(os.getcwd() + "\images\imageabcde1.png", interval=0.05)
        pyautogui.press('return')

        skip = False
        print('1 IMAGE ONLY TEST')
        # CLICK WHISP BUTTON IF ENABLED IF NOT TEST FAILED
        try:
            driver.find_element(By.ID, accessabilities.whisp_button_id).click()
        except NoSuchElementException:
            print("Test Failed")
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
            except NoSuchElementException:
                print('Test Failed')
                skip = True

            if skip is False:
                print('Test Successful')

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
            print('NORMAL TEXT AND IMAGE')
            # CLICK WHISP BUTTON IF ENABLED IF NOT TEST FAILED
            try:
                driver.find_element(By.ID, accessabilities.whisp_button_id).click()
            except NoSuchElementException:
                print("Test Failed")
                skip = True
                pass
            time.sleep(5)

            if skip is False:
                # REFRESH TO SHOW TWEETS
                driver.refresh()
                time.sleep(10)

                # TEST
                test = False
                try:
                    test = (driver.find_element(By.CSS_SELECTOR, accessabilities.image_2_css_selector).is_displayed())
                except NoSuchElementException:
                    print('Test Failed')
                    # TEST ALREADY DECLARED FAILED SKIP IF CONDITION
                    skip = True

                if skip is False:
                    # IF BOTH IMAGE AND TEXT ARE FOUND THE TEST IS SUCCESSFUL
                    if test and accessabilities.sample_text in driver.page_source:
                        print('Test Successful')
                    else:
                        print('Test Failed')

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

                print('TEXT EXCEEDING LIMIT AND IMAGE')

                # CLICK WHISP BUTTON IF ENABLED IF NOT TEST FAILED
                try:
                    test = driver.find_element(By.ID, accessabilities.whisp_button_id).is_enabled()
                except NoSuchElementException:
                    pass

                if test:
                    print('Test Failed')
                else:
                    print('Test Successful')

    def image_exceeding_limit(self):
        # SIGN IN
        driver = TestHomePage.sign_in()
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
        driver = TestHomePage.image_exceeding_limit()
        # CHECK NUMBER OF IMAGES UPLOADED
        print('IMAGE EXCEEDING LIMIT TEST')
        print('ONLY 4 IMAGES ARE UPLOADED')
        skip = False
        test = True

        image_list = driver.find_elements(By.ID, accessabilities.images_in_tweetbox_id)

        if len(image_list) == 4:
            print('Test Successful')
        else:
            print(len(image_list))
            print('Test Failed')
            # TEST ALREADY DECLARED FAILED SKIP IF CONDITION
            skip = True

        if skip is False:
            print('TWEET SHOWS 4 IMAGES ONLY')
            try:
                driver.find_element(By.ID, accessabilities.whisp_button_id).click()
            except NoSuchElementException:
                print('Test Failed')
                skip = True

            if skip is False:
                driver.refresh()
                time.sleep(10)
                try:
                    test = (driver.find_element(By.CSS_SELECTOR,
                                                accessabilities.image_2_css_selector).is_displayed() and driver.find_element(
                        By.CSS_SELECTOR, accessabilities.image_1_css_selector).is_displayed() and driver.find_element(
                        By.CSS_SELECTOR, accessabilities.image_3_css_selector).is_displayed() and driver.find_element(
                        By.CSS_SELECTOR,
                        accessabilities.image_4_css_selector).is_displayed() and not driver.find_element(
                        By.CSS_SELECTOR, accessabilities.image_5_css_selector).is_displayed())
                except NoSuchElementException:
                    print('Test Failed')
                    skip = True
                if skip is False:
                    if test:
                        print('Test Successful')
                    else:
                        print('Test Failed')

    def test_tweetbox_text_image_combinations_4(self):
        # case 8
        # UPLOAD 5 IMAGES
        driver = TestHomePage.image_exceeding_limit()
        # TYPE A NORMAL TEXT SAMPLE
        try:
            driver.find_element(By.ID, accessabilities.tweet_box_id).send_keys(accessabilities.sample_text)
        except NoSuchElementException:
            pass

        # CHECK NUMBER OF IMAGES UPLOADED
        print('NORMAL TEXT AND IMAGE EXCEEDING LIMIT TEST')

        skip = False
        test = True

        image_list = driver.find_elements(By.ID, accessabilities.images_in_tweetbox_id)

        if len(image_list) == 4:
            print('Test Successful')
        else:
            print(len(image_list))
            print('Test Failed')
            # TEST ALREADY DECLARED FAILED SKIP IF CONDITION
            skip = True

        if skip is False:
            print('TWEET SHOWS 4 IMAGES AND TEXT')
            try:
                driver.find_element(By.ID, accessabilities.whisp_button_id).click()
            except NoSuchElementException:
                print('Test Failed')
                skip = True

            if skip is False:
                driver.refresh()
                time.sleep(10)
                try:
                    test = (driver.find_element(By.CSS_SELECTOR,
                                                accessabilities.image_2_css_selector).is_displayed() and driver.find_element(
                        By.CSS_SELECTOR, accessabilities.image_1_css_selector).is_displayed() and driver.find_element(
                        By.CSS_SELECTOR, accessabilities.image_3_css_selector).is_displayed() and driver.find_element(
                        By.CSS_SELECTOR,
                        accessabilities.image_4_css_selector).is_displayed() and accessabilities.sample_text in driver.page_source and not driver.find_element(
                        By.CSS_SELECTOR, accessabilities.image_5_css_selector).is_displayed())
                except NoSuchElementException:
                    print('Test Failed')
                    skip = True
                if skip is False:
                    if test:
                        print('Test Successful')
                    else:
                        print('Test Failed')

    def test_tweetbox_text_image_combinations_5(self):
        # case 9
        # UPLOAD 5 IMAGES
        driver = TestHomePage.image_exceeding_limit()
        # TYPE TEXT EXCEEDING LIMIT
        try:
            driver.find_element(By.ID, accessabilities.tweet_box_id).send_keys(accessabilities.text_exceed_limit)
        except NoSuchElementException:
            pass

        # CHECK NUMBER OF IMAGES UPLOADED
        print('TEXT EXCEEDING LIMIT AND IMAGE EXCEEDING LIMIT TEST')
        test = False
        try:
            test = (driver.find_element(By.ID, accessabilities.whisp_button_id).is_enabled())
        except NoSuchElementException:
            pass

        if test:
            print('Test Failed')
        else:
            print("Test Successful")
