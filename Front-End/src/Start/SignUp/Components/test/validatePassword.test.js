import '@testing-library/jest-dom';
import validatePassword from '../validatePassword';

describe('validate the verification code', () => {
  it('validate the password', () => {
    expect(validatePassword({
      password: '',
      email: 'mahmoudsuliman@gmail.com',
    })).toEqual(
      {
        password: 'Password is required',
      },
    );
  });
  it('validate the password', () => {
    expect(validatePassword({
      password: '123456',
      email: 'mahmoudsuliman@gmail.com',
    })).toEqual(
      {
        password: 'Password needs to be 6 characters or more',
      },
    );
  });
  it('validate the password', () => {
    expect(validatePassword({
      password: '12345678912cascascscsac',
      email: 'mahmoudsuliman@gmail.com',
    })).toEqual(
      {},
    );
  });
});
