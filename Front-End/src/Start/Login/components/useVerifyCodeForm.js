import { useState } from 'react';
import validateCode from '../../SignUp/Components/validateCode';
import { verifyForgotPassword } from '../../../Services/accountServices';
/**
 * This function is used to manage the verification step in the forgot password form and apply
 * validations on the code.
 * @param {function} setSettingPassword Manages the password step status
 * @param {function} setStepVerify Manages the verification step status
 * @param {string} userEmailOrUsername used to send with code to the backend
 * @returns handleChange, values, handleSubmit, errors
 */
const useVerifyCodeForm = (userEmailOrUsername, setStepVerify, setSettingPassword) => {
  const [values, setValues] = useState({
    emailOrUsername: '',
    code: '',
  });
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      emailOrUsername: userEmailOrUsername,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validateCode(values));
    if (Object.keys(validateCode(values)).length === 0) {
      verifyForgotPassword(values).then((response) => {
        if (response.status === 200 || response.status === 201) {
          setStepVerify(false);
          setSettingPassword(true);
        } else if (response.status === 400) {
          setErrors({
            ...errors,
            code: 'Invalid code',
          });
        } else if (response.status === 404) {
          setErrors({
            ...errors,
            code: 'User not found',
          });
        }
      });
    }
  };

  return {
    handleChange, values, handleSubmit, errors,
  };
};

export default useVerifyCodeForm;
