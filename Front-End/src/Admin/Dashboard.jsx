import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NumberStat from './NumberStat';
import styles from './Dashboard.module.css';

function Dashboard() {
  const [noUsers, setNoUsers] = useState({
    title: '',
    interval: '',
    count: '',
  });
  const [noBanned, setNoBanned] = useState({
    title: '',
    interval: '',
    count: '',
  });
  const [tweetsRatio, settweetsRatio] = useState({
    title: '',
    interval: '',
    count: '',
  });
  useEffect(() => {
    axios.get('http://localhost:8000/statData').then((res) => {
      setNoUsers(res.data[0].noUsers);
      settweetsRatio(res.data[0].ratioTweets);
      setNoBanned(res.data[0].noBanned);
    });
  }, []);
  return (
    <div className={styles.dashboard}>
      <NumberStat
        type={noUsers.title}
        description={noUsers.interval}
        value={noUsers.count}
      />
      <NumberStat
        type={noBanned.title}
        description={noBanned.interval}
        value={noBanned.count}
      />
      <NumberStat
        type={tweetsRatio.title}
        description={tweetsRatio.interval}
        value={tweetsRatio.count}
      />
    </div>
  );
}

export default Dashboard;
