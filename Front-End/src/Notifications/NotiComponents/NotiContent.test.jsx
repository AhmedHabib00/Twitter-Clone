import React from 'react';
import { render } from '@testing-library/react';
import NotiContent from './NotiContent';

describe('NotiContent Component', () => {
  it('render noticontent', () => {
    const { getByTestId } = render(<NotiContent
      id="3"
      displayname="Esraa"
      content3="Followed you"
      notitype="followed"
    />);
    const noticontentDiv = getByTestId('noticontent-render-test');
    expect(noticontentDiv).toBeTruthy();
  });

  it('render noticontent avatar', () => {
    const { getByTestId } = render(<NotiContent
      id="3"
      displayname="Esraa"
      content3="Followed you"
      notitype="followed"
    />);
    const avatarDiv = getByTestId('noticontent-avatar-render-test');
    expect(avatarDiv).toBeTruthy();
  });

  it('render noticontent content', () => {
    const { getByTestId } = render(<NotiContent
      id="3"
      displayname="Esraa"
      content3="Followed you"
      notitype="followed"
    />);
    const contentDiv = getByTestId('content-render-test');
    expect(contentDiv).toBeTruthy();
  });

  it('render notitype noticontent content', () => {
    const { getByTestId } = render(<NotiContent
      id="3"
      displayname="Esraa"
      content3="Followed you"
      notitype="followed"
    />);
    const notitypeDiv = getByTestId('notitype-render-test');
    expect(notitypeDiv).toBeTruthy();
  });
});
