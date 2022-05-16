import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Post from './Post';

describe('Post Component', () => {
  it('render post', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Post
          id="17"
          username="Aly"
          displayname="Ahmed"
          content="yarab enta kader"
          URLs={['https://media.istockphoto.com/photos/make-decision-which-way-to-go-walking-on-directional-sign-on-asphalt-picture-id1138420319',
            'https://media.istockphoto.com/photos/make-decision-which-way-to-go-walking-on-directional-sign-on-asphalt-picture-id1138420319',
            'https://media.istockphoto.com/photos/make-decision-which-way-to-go-walking-on-directional-sign-on-asphalt-picture-id1138420319',
            'https://media.istockphoto.com/photos/make-decision-which-way-to-go-walking-on-directional-sign-on-asphalt-picture-id1138420319']}
          isLiked="true"
          isRetweeted="true"
          noOfLike="300"
          noOfReplies="0"
          noOfRetweets="1"
        />

      </BrowserRouter>,
    );
    const postDiv = getByTestId('post-render-test');
    expect(postDiv).toBeTruthy();
  });

  it('render post avatar', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Post
          id="17"
          username="Aly"
          displayname="Ahmed"
          content="yarab enta kader"
          URLs={['https://media.istockphoto.com/photos/make-decision-which-way-to-go-walking-on-directional-sign-on-asphalt-picture-id1138420319',
            'https://media.istockphoto.com/photos/make-decision-which-way-to-go-walking-on-directional-sign-on-asphalt-picture-id1138420319',
            'https://media.istockphoto.com/photos/make-decision-which-way-to-go-walking-on-directional-sign-on-asphalt-picture-id1138420319',
            'https://media.istockphoto.com/photos/make-decision-which-way-to-go-walking-on-directional-sign-on-asphalt-picture-id1138420319']}
          isLiked="true"
          isRetweeted="true"
          noOfLike="300"
          noOfReplies="0"
          noOfRetweets="1"
        />
      </BrowserRouter>,
    );
    const avatarDiv = getByTestId('post-avatar-render-test');
    expect(avatarDiv).toBeTruthy();
  });

  it('render post content', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Post
          id="17"
          username="Aly"
          displayname="Ahmed"
          content="yarab enta kader"
          URLs={['https://media.istockphoto.com/photos/make-decision-which-way-to-go-walking-on-directional-sign-on-asphalt-picture-id1138420319',
            'https://media.istockphoto.com/photos/make-decision-which-way-to-go-walking-on-directional-sign-on-asphalt-picture-id1138420319',
            'https://media.istockphoto.com/photos/make-decision-which-way-to-go-walking-on-directional-sign-on-asphalt-picture-id1138420319',
            'https://media.istockphoto.com/photos/make-decision-which-way-to-go-walking-on-directional-sign-on-asphalt-picture-id1138420319']}
          isLiked="true"
          isRetweeted="true"
          noOfLike="300"
          noOfReplies="0"
          noOfRetweets="1"
        />

      </BrowserRouter>,
    );
    const contentDiv = getByTestId('content-render-test');
    expect(contentDiv).toBeTruthy();
  });

  it('images post content', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Post
          id="17"
          username="Aly"
          displayname="Ahmed"
          content="yarab enta kader"
          URLs={['https://media.istockphoto.com/photos/make-decision-which-way-to-go-walking-on-directional-sign-on-asphalt-picture-id1138420319',
            'https://media.istockphoto.com/photos/make-decision-which-way-to-go-walking-on-directional-sign-on-asphalt-picture-id1138420319',
            'https://media.istockphoto.com/photos/make-decision-which-way-to-go-walking-on-directional-sign-on-asphalt-picture-id1138420319',
            'https://media.istockphoto.com/photos/make-decision-which-way-to-go-walking-on-directional-sign-on-asphalt-picture-id1138420319']}
          isLiked="true"
          isRetweeted="true"
          noOfLike="300"
          noOfReplies="0"
          noOfRetweets="1"
        />
      </BrowserRouter>,
    );
    const imagesDiv = getByTestId('images-render-test');
    expect(imagesDiv).toBeTruthy();
  });

  it('footer post content', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Post
          id="17"
          username="Aly"
          displayname="Ahmed"
          content="yarab enta kader"
          URLs={['https://media.istockphoto.com/photos/make-decision-which-way-to-go-walking-on-directional-sign-on-asphalt-picture-id1138420319',
            'https://media.istockphoto.com/photos/make-decision-which-way-to-go-walking-on-directional-sign-on-asphalt-picture-id1138420319',
            'https://media.istockphoto.com/photos/make-decision-which-way-to-go-walking-on-directional-sign-on-asphalt-picture-id1138420319',
            'https://media.istockphoto.com/photos/make-decision-which-way-to-go-walking-on-directional-sign-on-asphalt-picture-id1138420319']}
          isLiked="true"
          isRetweeted="true"
          noOfLike="300"
          noOfReplies="0"
          noOfRetweets="1"
        />
      </BrowserRouter>,
    );
    const footerDiv = getByTestId('footer-render-test');
    expect(footerDiv).toBeTruthy();
  });
});
