import '@testing-library/jest-dom';
import validatePassword from '../validatePassword';

describe('validate the verification code', () => {
  it('validate the password', () => {
    expect(validatePassword({
      password: '',
      emailOrUsername: 'mahmoudsuliman@gmail.com',
    })).toEqual(
      {
        password: 'password required',
      },
    );
  });
  it('validate the password', () => {
    expect(validatePassword({
      password: '',
      emailOrUsername: 'mahmoud',
    })).toEqual(
      {
        password: 'password required',
      },
    );
  });
  it('validate the password', () => {
    expect(validatePassword({
      password: 'Abdo#1gd',
      emailOrUsername: 'mahmoudsuliman@gmail.com',
    })).toEqual(
      {

      },
    );
  });
  it('validate the password', () => {
    expect(validatePassword({
      password: 'Abdo#1gd',
      emailOrUsername: 'mahmoud',
    })).toEqual(
      {

      },
    );
  });
});
