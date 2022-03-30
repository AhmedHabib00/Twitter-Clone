import React from 'react';
import { render } from '@testing-library/react';
import Feed from './Feed';

describe('Feed Component', () => {
  it('render feed', () => {
    const { getByTestId } = render(<Feed
      id="17"
      username="Aly"
      displayname="Ahmed"
      content="yarab enta kader"
      img1="https://media.istockphoto.com/photos/make-decision-which-way-to-go-walking-on-directional-sign-on-asphalt-picture-id1138420319"
      img2="https://media.istockphoto.com/photos/make-decision-which-way-to-go-walking-on-directional-sign-on-asphalt-picture-id1138420319"
      img3="https://media.istockphoto.com/photos/make-decision-which-way-to-go-walking-on-directional-sign-on-asphalt-picture-id1138420319"
      img4="https://media.istockphoto.com/photos/make-decision-which-way-to-go-walking-on-directional-sign-on-asphalt-picture-id1138420319"
    />);
    const feedDiv = getByTestId('feed-render-test');
    expect(feedDiv).toBeTruthy();
  });
});
