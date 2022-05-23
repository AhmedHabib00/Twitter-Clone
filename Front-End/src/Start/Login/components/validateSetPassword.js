/**
 * This function is used to validate the password user input.
 * @param {object} values contains the password1, password2
 * @returns errors
 */
export default function validateSetPassword(values) {
  const errors1 = {};
  const errors2 = {};
  if (!values.password1) {
    errors1.password1 = 'Password is required';
  } else if (values.password1.length < 8) {
    errors1.password1 = 'Password needs to be 8 characters or more';
  } else if (!/(?=.*?[A-Z])/.test(values.password1)) {
    errors1.password1 = 'Password should contain at least 1 uppercase, 1 lowercase, 1 number, 1 special character';
  } else if (!/(?=.*?[a-z])/.test(values.password1)) {
    errors1.password1 = 'Password should contain at least 1 uppercase, 1 lowercase, 1 number, 1 special character';
  } else if (!/(?=.*?[0-9])/.test(values.password1)) {
    errors1.password1 = 'Password should contain at least 1 uppercase, 1 lowercase, 1 number, 1 special character';
  } else if (!/(?=.*?[#?!@$%^&*-/_])/.test(values.password1)) {
    errors1.password1 = 'Password should contain at least 1 uppercase, 1 lowercase, 1 number, 1 special character';
  }
  if (values.password1 !== values.password2) {
    errors2.password2 = 'Passwords does not match';
  }
  return { errors1, errors2 };
}
