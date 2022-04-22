import React from 'react';
import { render } from '@testing-library/react';
import ImageBox from './ImageBox';

describe('ImageBox Component', () => {
  it('render ImageBox', () => {
    const { getByTestId } = render(<ImageBox />);
    const imageBoxDiv = getByTestId('imageBox');
    expect(imageBoxDiv).toBeTruthy();
  });
});
