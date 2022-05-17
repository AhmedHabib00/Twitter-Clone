import React from 'react';
import { render } from '@testing-library/react';

import 'regenerator-runtime/runtime';
import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import AdminUsers from './AdminUsers';

Enzyme.configure({
  adapter: new EnzymeAdapter(),
});
describe('Array of Users test', () => {
  it('render Admin Navbar', () => {
    const { getByTestId } = render(
      <AdminUsers
        state=""
      />,
    );
    const adminUsers = getByTestId('adminUsers-div');
    expect(adminUsers).toBeTruthy();
  });
});
