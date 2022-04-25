import test_signup
import test_signin

#SIGN UP TESTS
test_signup.test_signup_invalid_email_and_name()
test_signup.test_signup_invalid_email_only()
test_signup.test_signup_invalid_name_only()
test_signup.test_signup_invalid_date_only()
test_signup.test_signup_valid_date_only()
test_signup.test_signup_valid_date_and_name()
test_signup.test_signup_valid_date_and_email()
print('SIGN_UP_TESTS_DONE')

#SIGN IN TESTS
test_signin.test_empty_username()
test_signin.test_empty_password()
test_signin.test_wrong_username()
test_signin.test_wrong_password()
print('SIGN_IN_TESTS_DONE')
