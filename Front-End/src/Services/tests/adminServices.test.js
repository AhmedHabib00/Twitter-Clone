import getStats from '../adminServices';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import '@testing-library/jest-dom';

describe('testing dashboard apis', () => {
  let noBanned = {};
  let tweetsRatio = {};
  let noUsers = {};
  const setNoBanned = (data) => {
    noBanned = data;
  };

  const setTweetsRatio = (data) => {
    tweetsRatio = data;
  };

  const setNoUsers = (data) => {
    noUsers = data;
  };
  it('test post verification code', async () => {
    getStats({ setNoBanned, setNoUsers, setTweetsRatio }).then((response) => {
      expect(response.status).toBe(201);
    });
    console.log(noUsers);
    console.log(tweetsRatio);
    console.log(noBanned);
  });
});
