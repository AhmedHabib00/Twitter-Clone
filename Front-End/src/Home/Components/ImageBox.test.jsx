import React from 'react';
import { render } from '@testing-library/react';
import ImageBox from './ImageBox';

describe('ImageBox Component', () => {
  it('render ImageBox', () => {
    const { getByTestId } = render(<ImageBox images={[
      {
        id: 1,
        imageUrl: 'https://media.istockphoto.com/photos/make-decision-which-way-to-go-walking-on-directional-sign-on-asphalt-picture-id1138420319',
      },
      {
        id: 2,
        imageUrl: 'https://media.istockphoto.com/photos/make-decision-which-way-to-go-walking-on-directional-sign-on-asphalt-picture-id1138420319',
      },
      {
        id: 3,
        imageUrl: 'https://media.istockphoto.com/photos/make-decision-which-way-to-go-walking-on-directional-sign-on-asphalt-picture-id1138420319',
      },
      {
        id: 4,
        imageUrl: 'https://media.istockphoto.com/photos/make-decision-which-way-to-go-walking-on-directional-sign-on-asphalt-picture-id1138420319',
      },
    ]}
    />);
    const imageBoxDiv = getByTestId('imagebox');
    expect(imageBoxDiv).toBeTruthy();
  });
});
