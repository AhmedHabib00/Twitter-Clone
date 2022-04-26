import '@testing-library/jest-dom';
import validateSetPassword from '../validateSetPassword';

describe('validate the verification code', () => {
  it('validate the password', () => {
    expect(validateSetPassword({
      password1: '',
      password2: '',
    })).toEqual(
      {
        errors1: {
          password1: 'Password is required',
        },
        errors2: {

        },
      },
    );
  });
  it('validate the password', () => {
    expect(validateSetPassword({
      password1: '123456',
      password2: '',
    })).toEqual(
      {
        errors1: {
          password1: 'Password needs to be 8 characters or more',
        },
        errors2: {
          password2: 'Passwords does not match',
        },

      },
    );
  });
  it('validate the password', () => {
    expect(validateSetPassword({
      password1: 'Abdo#1gd',
      password2: '',
    })).toEqual(
      {
        errors1: {

        },
        errors2: {
          password2: 'Passwords does not match',
        },

      },
    );
  });
  it('validate the password', () => {
    expect(validateSetPassword({
      password1: 'Abdo#1gd',
      password2: 'Abdo#1gd',
    })).toEqual(
      {
        errors1: {

        },
        errors2: {

        },

      },
    );
  });
});
