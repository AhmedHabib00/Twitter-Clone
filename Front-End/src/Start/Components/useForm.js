import { useState } from 'react';
import validateInfo from './validateInfo';

const useForm = (date, setStepOne, setStepVerify) => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    birthdate: '',
  });
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
      birthdate: date,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validateInfo(values));
    if (Object.keys(errors).length === 0) {
      setStepOne(false);
      setStepVerify(true);
    }
  };

  return {
    handleChange, values, handleSubmit, errors,
  };
};

export default useForm;
