import { useState } from 'react';
import { LoginPassword } from '../../../Services/accountServices';
/**
 * This function is used to manage the Password step in the signup form and apply
 * validations on it.
 * @param {function} setStepPassword Manages the password step status
 * @param {function} setStepUsername Manages the username selection step status
 * @param {string} userEmail used to send with password to the backend
 * @returns handleChange, values, handleSubmit, errors
 */
const usePasswordForm = (userEmail, handleAfterSignin) => {
  const [values, setValues] = useState({
    password: '',
    email: '',
  });
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

    LoginPassword(values).then((response) => {
      if (response.status === 201) {
        localStorage.setItem('logged', true);
        localStorage.setItem('admin', false);
        const logged = localStorage.getItem('logged');
        const admin = localStorage.getItem('admin');
        handleAfterSignin(JSON.parse(logged), JSON.parse(admin));
      }
    });
  };

  return {
    handleChange, values, handleSubmit,
  };
};

export default usePasswordForm;
