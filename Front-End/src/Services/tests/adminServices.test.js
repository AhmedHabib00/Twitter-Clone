import { useState } from 'react';
import getStats from '../adminServices';

describe('testing dashboard apis', () => {
  test('testing getting stats', async () => {
    const [noBanned, setNoBanned] = useState({});
    const [tweetsRatio, settweetsRatio] = useState({});
    const [noUsers, setNoUsers] = useState({});
    await getStats({ setNoBanned, settweetsRatio, setNoUsers }).then((response) => {
      expect(response.status).toBe(201);
    });
  });
});
