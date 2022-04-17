/**
 * This function is used to validate the email user input.
 * @param {object} values contains the email
 * @returns errors
 */
export default function validatePassword(values) {
  const errors = {};
  if (!values.password) {
    errors.password = 'password required';
  }
  return errors;
}
