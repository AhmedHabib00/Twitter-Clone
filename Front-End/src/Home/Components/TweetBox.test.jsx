import React from 'react';
import { render } from '@testing-library/react';

import 'regenerator-runtime/runtime';
import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import { BrowserRouter } from 'react-router-dom';
import TweetBox from './TweetBox';

Enzyme.configure({
  adapter: new EnzymeAdapter(),
});

describe('TweetBox tests', () => {
  it('render tweetbox', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <TweetBox
          boxId="wezo"
        />
      </BrowserRouter>,
    );
    const tweetboxDiv = getByTestId('Tweet-box');
    expect(tweetboxDiv).toBeTruthy();
  });
});
