import { useState } from 'react';
import validateEmail from './validateEmail';
/**
 * This function is used to manage the first step in the signup form and apply
 * validations.
 * @param {function} setStepOne Manages the status of the first step
 * @param {function} setStepVerify Manages the verification step status
 * @returns handleChange, values, handleSubmit, errors,
 */
const useLoginForm = (setStepOne, setEmail, setLoginPassword) => {
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
      setStepOne(false);
      setLoginPassword(true);
      setEmail(values.emailOrUsername);
    }
  };

  return {
    handleChange, values, handleSubmit, errors,
  };
};

export default useLoginForm;
