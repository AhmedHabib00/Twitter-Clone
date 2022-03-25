import { useState } from 'react';
import validateInfo from './validateInfo';

const useForm = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',

  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validateInfo(values));
  };

  return {
    handleChange, values, handleSubmit, errors,
  };
};

export default useForm;
