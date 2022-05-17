import { useState } from 'react';
import validateInfo from './validateInfo';
import signUpInfo from '../../../Services/accountServices';

/**
 * This function is used to manage the first step in the signup form and apply
 * validations.
 * @param {string} date The birthdate of the user
 * @param {function} setStepOne Manages the status of the first step
 * @param {function} setStepVerify Manages the verification step status
 * @param {function} setIsLoading used to set the state of the loader
 * @returns handleChange, values, handleSubmit, errors,
 */
const useForm = (date, setStepOne, setStepVerify, setIsLoading) => {
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
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validateInfo(values));
    const today = new Date();
    const birthdate = new Date(date);
    if (today <= new Date(
      birthdate.getFullYear() + 16,
      birthdate.getMonth(),

      birthdate.getDate(),
    )) {
      setErrors({
        ...errors,
        birthdate: 'User must be over 16 years old.',
      });
    }
    console.log(errors);
    if (Object.keys(validateInfo(values)).length === 0) {
      setIsLoading(true);
      signUpInfo({
        ...values,
        birthdate: date,
      }).then((response) => {
        if (response.status === 201) {
          setIsLoading(false);
          setStepOne(false);
          setStepVerify(true);
        } else if (response.status === 400) {
          setErrors({
            ...errors,
            email: 'User already registered',
          });
          setIsLoading(false);
        }
      });
    }
  };

  return {
    handleChange, values, handleSubmit, errors,
  };
};

export default useForm;
