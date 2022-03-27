import { useState } from 'react';
import validateCode from './validateCode';

const useFormCode = (setStepPassword, setStepVerify, userEmail) => {
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
      setStepVerify(false);
      setStepPassword(true);
    }
  };

  return {
    handleChange, values, handleSubmit, errors,
  };
};

export default useFormCode;
