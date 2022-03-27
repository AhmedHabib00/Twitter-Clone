import { useState } from 'react';
import validatePassword from './validatePassword';

const useFormPassword = (setStepPassword, setStepUsername, userEmail) => {
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
      setStepPassword(false);
      setStepUsername(true);
    }
  };

  return {
    handleChange, values, handleSubmit, errors,
  };
};

export default useFormPassword;
