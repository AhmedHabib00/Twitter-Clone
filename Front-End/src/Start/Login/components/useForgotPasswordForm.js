import { useState } from 'react';
import validateEmail from './validateEmail';
import { searchEmail } from '../../../Services/accountServices';
/**
 * This function is used to manage the first step in the forgot passwors modals and apply
 * validations.
 * @param {function} setVerifyCode Manages the verification code modal
 * @param {function} setEmail Sets the user email or username
 * @param {function} setForgotPassword Manages the status of the forgot password modal
 * @returns handleChange, values, handleSubmit, errors,
 */
const useForgetPasswordForm = (setEmail, setForgotPassword, setVerifyCode) => {
  const [values, setValues] = useState({
    emailOrUsername: '',
  });
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validateEmail(values));
    if (Object.keys(validateEmail(values)).length === 0) {
      searchEmail(values).then((response) => {
        if (response.status === 200 || response.status === 201) {
          setEmail(values.emailOrUsername);
          setForgotPassword(false);
          setVerifyCode(true);
        } else if (response.status === 404) {
          setErrors({
            ...errors,
            emailOrUsername: 'User not found',
          });
        }
      });
    }
  };

  return {
    handleChange, values, handleSubmit, errors,
  };
};

export default useForgetPasswordForm;
