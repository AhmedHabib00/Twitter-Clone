import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Start from '../Start';

describe('Start page', () => {
  it('render Start page', () => {
    const { getByTestId } = render(<Start />);
    const signupButton = getByTestId('signup-button');
    expect(signupButton).toBeTruthy();
    const googleButton = getByTestId('google-button');
    expect(googleButton).toBeTruthy();
    const facebookButton = getByTestId('facebook-button');
    expect(facebookButton).toBeTruthy();
    const signinButton = getByTestId('signin-button');
    expect(signinButton).toBeTruthy();
  });
  it('render Start page', () => {
    const { queryByTestId } = render(<Start />);
    const signupModal = queryByTestId('signup-modal');
    expect(signupModal).toBeFalsy();
  });
});
