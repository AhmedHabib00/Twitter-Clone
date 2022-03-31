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
    errors.password = 'Password needs to be 6 characters or more';
  }
  return errors;
}
