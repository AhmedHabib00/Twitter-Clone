import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import NumberStat from './NumberStat';
import styles from './Dashboard.module.css';
import getStats from '../Services/adminServices';

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
  const [tweetsRatio, setTweetsRatio] = useState({
    title: '',
    interval: '',
    count: '',
  });
  useEffect(() => {
    getStats({ setNoUsers, setNoBanned, setTweetsRatio });
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
