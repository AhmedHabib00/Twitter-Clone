/**
 * This function is used to validate the username input.
 * @param {object} values contains the email and code
 * @returns errors
 */
export default function validateInfo(values) {
  const errors = {};
  if (!values.username) {
    errors.username = 'Please enter a username';
  } else if (!/@\S/.test(values.username)) {
    errors.username = 'Please start your username with @';
  }
  return errors;
}
