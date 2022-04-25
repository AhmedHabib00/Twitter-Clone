import React from 'react';
import { render } from '@testing-library/react';
import NotiFeed from './NotiFeed';

describe('NotiFeed Component', () => {
  it('render notifeed', () => {
    const { getByTestId } = render(<NotiFeed
      id="3"
      displayname="Esraa"
      content3="Followed you"
      notitype="followed"
    />);
    const notifeedDiv = getByTestId('notifeed-render-test');
    expect(notifeedDiv).toBeTruthy();
  });
});
