import '@testing-library/jest-dom';
import validateCode from '../validateCode';

describe('validate the verification code', () => {
  it('validate the code', () => {
    expect(validateCode({
      code: '',
      email: 'mahmoudsuliman@gmail.com',
    })).toEqual(
      {
        code: 'Verification code is required',
      },
    );
  });
  it('validate the code', () => {
    expect(validateCode({
      code: '123456',
      email: 'mahmoudsuliman@gmail.com',
    })).toEqual(
      {

      },
    );
  });
  it('validate the code', () => {
    expect(validateCode({
      code: '123456789',
      email: 'mahmoudsuliman@gmail.com',
    })).toEqual(
      {
        code: 'Verification code should be 6 characters',
      },
    );
  });
});
