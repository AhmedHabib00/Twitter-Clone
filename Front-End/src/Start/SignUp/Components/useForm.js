import { useState } from 'react';
import validateInfo from './validateInfo';
import signUpInfo from '../../../Services/accountServices';

/**
 * This function is used to manage the first step in the signup form and apply
 * validations.
 * @param {string} date The birthdate of the user
 * @param {function} setStepOne Manages the status of the first step
 * @param {function} setStepVerify Manages the verification step status
 * @returns handleChange, values, handleSubmit, errors,
 */
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
