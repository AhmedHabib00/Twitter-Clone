import React from 'react';
import { render } from '@testing-library/react';
import Post from './Post';

describe('Post Component', () => {
  it('render post', () => {
    const { getByTestId } = render(<Post
      id="17"
      username="Aly"
      displayname="Ahmed"
      content="yarab enta kader"
      img1="https://media.istockphoto.com/photos/make-decision-which-way-to-go-walking-on-directional-sign-on-asphalt-picture-id1138420319"
      img2="https://media.istockphoto.com/photos/make-decision-which-way-to-go-walking-on-directional-sign-on-asphalt-picture-id1138420319"
      img3="https://media.istockphoto.com/photos/make-decision-which-way-to-go-walking-on-directional-sign-on-asphalt-picture-id1138420319"
      img4="https://media.istockphoto.com/photos/make-decision-which-way-to-go-walking-on-directional-sign-on-asphalt-picture-id1138420319"
      isLiked="true"
      isRetweeted="true"
      noOfLike="300"
      noOfReplies="0"
      noOfRetweets="1"
    />);
    const postDiv = getByTestId('post-render-test');
    expect(postDiv).toBeTruthy();
  });

  it('render post avatar', () => {
    const { getByTestId } = render(<Post
      id="17"
      username="Aly"
      displayname="Ahmed"
      content="yarab enta kader"
      img1="https://media.istockphoto.com/photos/make-decision-which-way-to-go-walking-on-directional-sign-on-asphalt-picture-id1138420319"
      img2="https://media.istockphoto.com/photos/make-decision-which-way-to-go-walking-on-directional-sign-on-asphalt-picture-id1138420319"
      img3="https://media.istockphoto.com/photos/make-decision-which-way-to-go-walking-on-directional-sign-on-asphalt-picture-id1138420319"
      img4="https://media.istockphoto.com/photos/make-decision-which-way-to-go-walking-on-directional-sign-on-asphalt-picture-id1138420319"
      isLiked="true"
      isRetweeted="true"
      noOfLike="300"
      noOfReplies="0"
      noOfRetweets="1"

    />);
    const avatarDiv = getByTestId('post-avatar-render-test');
    expect(avatarDiv).toBeTruthy();
  });

  it('render post content', () => {
    const { getByTestId } = render(<Post
      id="17"
      username="Aly"
      displayname="Ahmed"
      content="yarab enta kader"
      img1="https://media.istockphoto.com/photos/make-decision-which-way-to-go-walking-on-directional-sign-on-asphalt-picture-id1138420319"
      img2="https://media.istockphoto.com/photos/make-decision-which-way-to-go-walking-on-directional-sign-on-asphalt-picture-id1138420319"
      img3="https://media.istockphoto.com/photos/make-decision-which-way-to-go-walking-on-directional-sign-on-asphalt-picture-id1138420319"
      img4="https://media.istockphoto.com/photos/make-decision-which-way-to-go-walking-on-directional-sign-on-asphalt-picture-id1138420319"
      isLiked="true"
      isRetweeted="true"
      noOfLike="300"
      noOfReplies="0"
      noOfRetweets="1"

    />);
    const contentDiv = getByTestId('content-render-test');
    expect(contentDiv).toBeTruthy();
  });

  it('images post content', () => {
    const { getByTestId } = render(<Post
      id="17"
      username="Aly"
      displayname="Ahmed"
      content="yarab enta kader"
      img1="https://media.istockphoto.com/photos/make-decision-which-way-to-go-walking-on-directional-sign-on-asphalt-picture-id1138420319"
      img2="https://media.istockphoto.com/photos/make-decision-which-way-to-go-walking-on-directional-sign-on-asphalt-picture-id1138420319"
      img3="https://media.istockphoto.com/photos/make-decision-which-way-to-go-walking-on-directional-sign-on-asphalt-picture-id1138420319"
      img4="https://media.istockphoto.com/photos/make-decision-which-way-to-go-walking-on-directional-sign-on-asphalt-picture-id1138420319"
      isLiked="true"
      isRetweeted="true"
      noOfLike="300"
      noOfReplies="0"
      noOfRetweets="1"
    />);
    const imagesDiv = getByTestId('images-render-test');
    expect(imagesDiv).toBeTruthy();
  });

  it('footer post content', () => {
    const { getByTestId } = render(<Post
      id="17"
      username="Aly"
      displayname="Ahmed"
      content="yarab enta kader"
      img1="https://media.istockphoto.com/photos/make-decision-which-way-to-go-walking-on-directional-sign-on-asphalt-picture-id1138420319"
      img2="https://media.istockphoto.com/photos/make-decision-which-way-to-go-walking-on-directional-sign-on-asphalt-picture-id1138420319"
      img3="https://media.istockphoto.com/photos/make-decision-which-way-to-go-walking-on-directional-sign-on-asphalt-picture-id1138420319"
      img4="https://media.istockphoto.com/photos/make-decision-which-way-to-go-walking-on-directional-sign-on-asphalt-picture-id1138420319"
      isLiked="true"
      isRetweeted="true"
      noOfLike="300"
      noOfReplies="0"
      noOfRetweets="1"

    />);
    const footerDiv = getByTestId('footer-render-test');
    expect(footerDiv).toBeTruthy();
  });
});
