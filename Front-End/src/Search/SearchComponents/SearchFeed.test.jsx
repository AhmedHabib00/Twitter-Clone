import React from 'react';
import { render } from '@testing-library/react';
import Feed from './SearchFeed';

describe('Feed Component', () => {
  it('render feed', () => {
    const { getByTestId } = render(<Feed
      id="1"
      userName="Noha Tarek El-Boghdady"
      displayName="Noha"
      content="Happy birthday Melissa! Much love as always. Enjoy!"
      img1="https://images.pexels.com/photos/2072181/pexels-photo-2072181.jpeg"
      img2="https://images.pexels.com/photos/428124/pexels-photo-428124.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      img3="https://media.istockphoto.com/photos/make-decision-which-way-to-go-walking-on-directional-sign-on-asphalt-picture-id1138420319"
      img4="https://media.istockphoto.com/photos/make-decision-which-way-to-go-walking-on-directional-sign-on-asphalt-picture-id1138420319"
      isLiked="true"
      isRetweeted="true"
      noOfLike="300"
      noOfReplies="0"
      noOfRetweets="1"
    />);
    const feedDiv = getByTestId('feed-render-test');
    expect(feedDiv).toBeTruthy();
  });
});
