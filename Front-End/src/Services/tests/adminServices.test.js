import getStats from '../adminServices';

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
  test('testing getting stats', async () => {
    getStats({ setNoBanned, setTweetsRatio, setNoUsers }).then((response) => {
      expect(response.status).toBe(201);
    });
  });
});
