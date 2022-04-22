import { useState } from 'react';
import validateSetPassword from './validateSetPassword';
import { setNewPassword, getClientRole } from '../../../Services/accountServices';
/**
 * This function is used to manage the set new password step in the signup form and apply
 * validations on the code.
 * @param {function} setSettingPassword Manages the set newpassword step status
 * @param {string} handleAfterSignin handles routing and authorization
 * @returns handleChange, values, handleSubmit, errors1, errors2
 */
const useSetPasswordForm = (setSettingPassword, handleAfterSignin) => {
  const [values, setValues] = useState({
    password1: '',
    password2: '',
  });
  const [errors1, setErrors1] = useState({});
  const [errors2, setErrors2] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors1(validateSetPassword(values).errors1);
    setErrors2(validateSetPassword(values).errors2);
    if (Object.keys(validateSetPassword(values).errors1).length === 0
     && Object.keys(validateSetPassword(values).errors2).length === 0) {
      setNewPassword(values.password1).then((response) => {
        if (response.status === 200 || response.status === 201) {
          setSettingPassword(false);
          const token = localStorage.getItem('temp-token');
          localStorage.setItem('token', token);
          localStorage.removeItem('temp-token');
          (async () => {
            if (localStorage.token) {
              const resp = await getClientRole();
              if (resp.role === 'Admin') {
                handleAfterSignin(true, true);
              } else {
                handleAfterSignin(true, false);
              }
            }
          })();
        }
      });
    }
  };

  return {
    handleChange, values, handleSubmit, errors1, errors2,
  };
};

export default useSetPasswordForm;
