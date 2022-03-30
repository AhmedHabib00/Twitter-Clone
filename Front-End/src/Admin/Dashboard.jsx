import React from 'react';
import NumberStat from './NumberStat';
import styles from './Dashboard.module.css';

function Dashboard() {
  return (
    <div className={styles.dashboard}>
      <NumberStat type="No. of tweets" description="In 2022" value="15K" />
      <NumberStat type="No. of tweets" description="In 2022" value="15K" />
      <NumberStat type="No. of tweets" description="In 2022" value="15K" />
    </div>
  );
}

export default Dashboard;
