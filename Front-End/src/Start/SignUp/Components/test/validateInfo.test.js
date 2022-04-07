import '@testing-library/jest-dom';
import validateInfo from '../validateInfo';

describe('validate the user Inforamtion', () => {
  it('validate name, email', () => {
    expect(validateInfo({
      name: 'Mahmoud Suliman',
      email: 'mahmoud@gmail.com',
    })).toEqual({});
  });
  it('validate name, email', () => {
    expect(validateInfo({
      name: '',
      email: 'mahmoud@gmail.com',
    })).toEqual({
      name: 'name required',
    });
  });
  it('validate name, email', () => {
    expect(validateInfo({
      name: '',
      email: '',
    })).toEqual({
      name: 'name required',
      email: 'Email required',
    });
  });
});
