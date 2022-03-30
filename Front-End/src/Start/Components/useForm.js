import { useState } from 'react';
import validateInfo from './validateInfo';
import signUpInfo from '../../Services/accountServices';

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
    if (Object.keys(validateInfo(values)).length === 0) {
      signUpInfo(values).then((response) => {
        if (response.status === 201) {
          setStepOne(false);
          setStepVerify(true);
        }
      });
    }
  };

  return {
    handleChange, values, handleSubmit, errors,
  };
};

export default useForm;
