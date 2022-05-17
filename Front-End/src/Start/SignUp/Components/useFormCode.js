import { useState } from 'react';
import validateCode from './validateCode';
import { signUpCode } from '../../../Services/accountServices';

/**
 * This function is used to manage the verification step in the signup form and apply
 * validations on the code.
 * @param {function} setStepPassword Manages the password step status
 * @param {function} setStepVerify Manages the verification step status
 * @param {string} userEmail used to send with code to the backend
 * @param {function} setIsLoading used to set the state of the loader
 * @returns handleChange, values, handleSubmit, errors
 */
const useFormCode = (setStepPassword, setStepVerify, userEmail, setIsLoading) => {
  const [values, setValues] = useState({
    code: '',
    email: '',
  });
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
      email: userEmail,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validateCode(values));
    if (Object.keys(validateCode(values)).length === 0) {
      setIsLoading(true);
      signUpCode(values).then((response) => {
        if (response.status === 200) {
          const token = response.data['x-auth-token'];
          localStorage.setItem('temp-token', token);
          setStepVerify(false);
          setStepPassword(true);
          setIsLoading(false);
        } else if (response.status === 400) {
          setErrors({
            ...errors,
            code: 'Incorrect verification code - Registeration session expired',
          });
          setIsLoading(false);
        }
      });
    }
  };

  return {
    handleChange, values, handleSubmit, errors,
  };
};

export default useFormCode;
