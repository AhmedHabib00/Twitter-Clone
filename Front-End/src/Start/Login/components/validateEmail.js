/**
 * This function is used to validate the email user input.
 * @param {object} values contains the email
 * @returns errors
 */
export default function validateEmail(values) {
  const errors = {};
  if (!values.email) {
    errors.email = 'Email required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email address is invalid';
  }
  return errors;
}
