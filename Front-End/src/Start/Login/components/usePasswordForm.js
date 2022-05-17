import { useState } from 'react';
import { LoginPassword, getClientRole } from '../../../Services/accountServices';
import validatePassword from './validatePassword';
/**
 * This function is used to manage the Password step in the signup form and apply
 * validations on it.
 * @param {function} setStepPassword Manages the password step status
 * @param {function} setStepUsername Manages the username selection step status
 * @param {string} userEmail used to send with password to the backend
 * @param {function} setIsLoading used to set the state of the loader
 * @returns handleChange, values, handleSubmit, errors
 */
const usePasswordForm = (userEmail, handleAfterSignin, setIsLoading) => {
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
      setIsLoading(true);
      LoginPassword(values).then((response) => {
        if (response.status === 200 || response.status === 201) {
          const token = response.data['x-auth-token'];
          localStorage.setItem('token', token);
          localStorage.setItem('userId', response.data.data.userId);
          setIsLoading(false);
          (async () => {
            if (localStorage.token) {
              const resp = await getClientRole();
              console.log(resp);
              if (resp.role === 'Admin') {
                handleAfterSignin(true, true);
              } else {
                handleAfterSignin(true, false);
              }
            }
          })();
        } else if (response.status === 400) {
          setErrors({
            ...errors,
            password: 'Invalid email or username or password',
          });
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

export default usePasswordForm;
