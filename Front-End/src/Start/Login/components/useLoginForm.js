import { useState } from 'react';

/**
 * This function is used to manage the first step in the signup form and apply
 * validations.
 * @param {function} setStepOne Manages the status of the first step
 * @param {function} setStepVerify Manages the verification step status
 * @returns handleChange, values, handleSubmit, errors,
 */
const useLoginForm = (setStepOne) => {
  const [values, setValues] = useState({
    email: '',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setStepOne(false);
  };

  return {
    handleChange, values, handleSubmit,
  };
};

export default useLoginForm;
