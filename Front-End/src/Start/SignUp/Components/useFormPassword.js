import { useState } from 'react';
import validatePassword from './validatePassword';
import { signUpPassword } from '../../../Services/accountServices';

/**
 * This function is used to manage the Password step in the signup form and apply
 * validations on it.
 * @param {function} setStepPassword Manages the password step status
 * @param {function} setStepUsername Manages the username selection step status
 * @param {string} userEmail used to send with password to the backend
 * @param {function} setIsLoading used to set the state of the loader
 * @returns handleChange, values, handleSubmit, errors
 */
const useFormPassword = (setStepPassword, setStepUsername, userEmail, setIsLoading) => {
  const [values, setValues] = useState({
    password: '',
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
    setErrors(validatePassword(values));
    if (Object.keys(validatePassword(values)).length === 0) {
      setIsLoading(true);
      signUpPassword(values).then((response) => {
        if (response.status === 200) {
          setStepPassword(false);
          setStepUsername(true);
          setIsLoading(false);
        }
        setIsLoading(false);
      });
    }
  };

  return {
    handleChange, values, handleSubmit, errors,
  };
};

export default useFormPassword;
