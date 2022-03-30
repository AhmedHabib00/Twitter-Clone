import React from 'react';
import { render } from '@testing-library/react';
import ImageBox from './ImageBox';

describe('ImageBox Component', () => {
  test('render imageBox', () => {
    const { getByTestId } = render(<ImageBox />);
    const image = getByTestId('image');
    expect(image).toBeTruthy();
  });
});
