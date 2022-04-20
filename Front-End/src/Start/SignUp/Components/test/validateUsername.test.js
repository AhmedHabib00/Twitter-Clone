import '@testing-library/jest-dom';
import validateUsername from '../validateUsername';

describe('validate the username', () => {
  it('validate the username', () => {
    expect(validateUsername({
      username: '',
      email: 'mahmoudsuliman@gmail.com',
    })).toEqual(
      {
        username: 'Please enter a username',
      },
    );
  });
  it('validate the username', () => {
    expect(validateUsername({
      username: 'mahmoud',
      email: 'mahmoudsuliman@gmail.com',
    })).toEqual(
      {

      },
    );
  });
});
