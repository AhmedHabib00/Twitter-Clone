/**
 * This function is used to validate the email and name user input.
 * @param {object} values contains the email, name and date
 * @returns errors
 */
export default function validateInfo(values) {
  const errors = {};
  if (!values.name.trim()) {
    errors.name = 'name required';
  } else if (!/^[A-Za-z]+/.test(values.name.trim())) {
    errors.name = 'Enter a valid name';
  }

  if (!values.email) {
    errors.email = 'Email required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email address is invalid';
  }

  return errors;
}
