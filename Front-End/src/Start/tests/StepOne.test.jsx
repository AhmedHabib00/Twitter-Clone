import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignUp from '../SignUp/SignUp';

describe('Sign Up page', () => {
  it('render the rest of the pages', () => {
    const { getByTestId } = render(<SignUp closeSignup={false} />);
    const inputName = getByTestId('input-name');
    expect(inputName).toBeTruthy();
    const inputEmail = getByTestId('input-email');
    expect(inputEmail).toBeTruthy();
    const datePicker = getByTestId('date-picker');
    expect(datePicker).toBeTruthy();
  });
});
