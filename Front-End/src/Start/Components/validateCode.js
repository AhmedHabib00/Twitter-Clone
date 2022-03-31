/**
 * This function is used to validate the code user input.
 * @param {object} values contains the email and code
 * @returns errors
 */
export default function validateCode(values) {
  const errors = {};
  if (!values.code) {
    errors.code = 'Verification code is required';
  } else if (values.code.length < 6 || values.code.length > 6) {
    errors.code = 'Verification code should be 6 characters';
  }
  return errors;
}
