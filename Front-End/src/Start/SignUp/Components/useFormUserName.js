import { useState } from 'react';
import validateUsername from './validateUsername';
import { signUpUsername } from '../../../Services/accountServices';

/**
 * This function is used to manage the username step in the signup form and apply
 * validations on it.
 * @param {string} userEmail used to send with username to the backend
 * @returns handleChange, values, handleSubmit, errors
 */
const useFormUserName = (userEmail, handleAfterSignup) => {
  const [values, setValues] = useState({
    username: '',
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
    setErrors(validateUsername(values));
    if (Object.keys(validateUsername(values)).length === 0) {
      signUpUsername(values).then((response) => {
        if (response.status === 201) {
          const token = localStorage.getItem('temp-token');
          localStorage.setItem('token', token);
          localStorage.removeItem('temp-token');
          handleAfterSignup(true, false);
        } else if (response.status === 400) {
          setErrors({
            ...errors,
            username: 'username already in use',
          });
        }
      });
    }
  };

  return {
    handleChange, values, handleSubmit, errors,
  };
};

export default useFormUserName;
