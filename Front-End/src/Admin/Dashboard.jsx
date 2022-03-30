import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NumberStat from './NumberStat';
import styles from './Dashboard.module.css';

function Dashboard() {
  const [noUsers, setNoUsers] = useState('');
  const [noBanned, setNoBanned] = useState('');
  const [tweetsRatio, settweetsRatio] = useState('');
  useEffect(() => {
    axios.get('http://localhost:8000/statData').then((res) => {
      setNoUsers(res.data[0].noUsers);
      settweetsRatio(res.data[0].tweetsRatio);
      setNoBanned(res.data[0].noBanned);
    });
  }, []);
  return (
    <div className={styles.dashboard}>
      <NumberStat type="Ratio of tweets" description="this month to pervious month" value={noUsers} />
      <NumberStat type="No. of users" description="All time" value={tweetsRatio} />
      <NumberStat type="No. of blocked users" description="All time" value={noBanned} />
    </div>
  );
}

export default Dashboard;
