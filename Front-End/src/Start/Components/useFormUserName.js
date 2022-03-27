import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import validateUsername from './validateUsername';

const useFormUserName = (userEmail) => {
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
      // route to the home page
    }
  };

  return {
    handleChange, values, handleSubmit, errors,
  };
};

export default useFormUserName;
