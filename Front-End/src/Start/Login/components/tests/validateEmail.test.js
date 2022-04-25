import '@testing-library/jest-dom';
import validateEmail from '../validateEmail';

describe('validate the user Inforamtion', () => {
  it('validate username', () => {
    expect(validateEmail({
      emailOrUsername: 'ahmed',
    })).toEqual({});
  });
  it('validate email', () => {
    expect(validateEmail({
      emailOrUsername: 'abdulrehman@gmail.com',
    })).toEqual({});
  });
  it('validate email', () => {
    expect(validateEmail({
      emailOrUsername: '',
    })).toEqual({
      emailOrUsername: 'Email or username required',
    });
  });
});
