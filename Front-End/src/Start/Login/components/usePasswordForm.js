import { useState } from 'react';
import { LoginPassword } from '../../../Services/accountServices';
import validatePassword from './validatePassword';
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
    emailOrUsername: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      emailOrUsername: userEmail,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validatePassword(values));
    if (Object.keys(validatePassword(values)).length === 0) {
      LoginPassword(values).then((response) => {
        if (response.status === 200 || response.status === 201) {
          const token = response.data['x-auth-token'];
          localStorage.setItem('token', token);
          console.log(response.data.data);
          if (response.data.data.role === 'User') {
            localStorage.setItem('logged', true);
            localStorage.setItem('admin', false);
            const logged = localStorage.getItem('logged');
            const admin = localStorage.getItem('admin');
            handleAfterSignin(JSON.parse(logged), JSON.parse(admin));
          } else if (response.data.data.role === 'Admin') {
            localStorage.setItem('logged', true);
            localStorage.setItem('admin', true);
            const logged = localStorage.getItem('logged');
            const admin = localStorage.getItem('admin');
            handleAfterSignin(JSON.parse(logged), JSON.parse(admin));
          }
          // // remove the following lines after integration
          // /// /////////////////////////////////////////////////////////////////////////
          // localStorage.setItem('logged', true);
          // localStorage.setItem('admin', false);
          // const logged = localStorage.getItem('logged');
          // const admin = localStorage.getItem('admin');
          // handleAfterSignin(JSON.parse(logged), JSON.parse(admin));
          // /// ////////////////////////////////////////////////////////////////////////////
        } else if (response.status === 400) {
          setErrors({
            ...errors,
            password: 'Invalid password',
          });
        }
      });
    }
  };

  return {
    handleChange, values, handleSubmit, errors,
  };
};

export default usePasswordForm;
