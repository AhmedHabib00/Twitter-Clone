/**
 * This function is used to validate the email or username from user input.
 * @param {object} values contains the email or username
 * @returns errors
 */
export default function validateEmail(values) {
  const errors = {};
  if (!values.emailOrUsername) {
    errors.emailOrUsername = 'Email or username required';
  }
  return errors;
}
