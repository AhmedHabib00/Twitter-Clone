/**
 * This function is used to validate the password user input.
 * @param {object} values contains the email, password
 * @returns errors
 */
export default function validatePassword(values) {
  const errors = {};
  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 8) {
    errors.password = 'Password needs to be 8 characters or more';
  } else if (!/(?=.*?[A-Z])/.test(values.password)) {
    errors.password = 'Password should contain at least 1 uppercase, 1 lowercase, 1 number, 1 special character';
  } else if (!/(?=.*?[a-z])/.test(values.password)) {
    errors.password = 'Password should contain at least 1 uppercase, 1 lowercase, 1 number, 1 special character';
  } else if (!/(?=.*?[0-9])/.test(values.password)) {
    errors.password = 'Password should contain at least 1 uppercase, 1 lowercase, 1 number, 1 special character';
  } else if (!/(?=.*?[#?!@$%^&*-/_])/.test(values.password)) {
    errors.password = 'Password should contain at least 1 uppercase, 1 lowercase, 1 number, 1 special character';
  }
  return errors;
}
