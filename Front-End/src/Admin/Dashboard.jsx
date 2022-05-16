import React, { useEffect, useState } from 'react';
import {
  BarChart, CartesianGrid, XAxis, YAxis,
  Tooltip, Legend, Bar, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell,
} from 'recharts';
import NumberStat from './NumberStat';
import styles from './Dashboard.module.css';
import getNoUsers, {
  getNoJoined, getNoTweets, getRatioTweets,
  getNoAgeUsers, getNoMostFollowed, getNoBanned,
} from '../Services/adminServices';

function Dashboard() {
  const COLORS = ['#bfef45', '#800000', '#808000', '#f58231', '#134e40',
    '#3cb44b', '#42d4f4', '#4363d8', '#911eb4', '#f032e6'];
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
  const [noMostFollowed, setNoMostFollowed] = useState();
  const [noTweets, setNoTweets] = useState();
  const [noJoinedUsers, setNoJoinedUsers] = useState();
  const [ageRanges, setAgeRanges] = useState();
  useEffect(() => {
    (async () => {
      setNoUsers(await getNoUsers());
      setNoBanned(await getNoBanned());
      setTweetsRatio(await getRatioTweets());
      setNoMostFollowed(await getNoMostFollowed());
      setNoTweets(await getNoTweets());
      setNoJoinedUsers(await getNoJoined());
      setAgeRanges(await getNoAgeUsers());
    })();
  }, []);

  return (
    <div className={styles.dashboard} id="admin-dashboard">
      <NumberStat
        type={noUsers.title}
        description={noUsers.interval}
        value={noUsers.count.toString()}
      />
      <NumberStat
        type={noBanned.title}
        description={noBanned.interval}
        value={noBanned.count.toString()}
      />
      <NumberStat
        type={tweetsRatio.title}
        description={tweetsRatio.interval}
        value={tweetsRatio.count.toString()}
      />
      { (noMostFollowed) ? (
        <div className={styles['graph-container']}>
          <div className={styles['graph-title']}>Users with the most number of followers</div>
          <ResponsiveContainer width="95%" height={350}>
            <BarChart
              data={noMostFollowed.stats}
              layout="vertical"
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis
                dataKey="username"
                type="category"
                style={{
                  fontSize: '10px',
                }}
              />
              <Tooltip />
              <Legend />
              <Bar name="Number of followers" dataKey="count" barSize="90%" fill="#0099FF" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : ''}
      { (noTweets) ? (
        <div className={styles['graph-container']}>
          <div className={styles['graph-title']}>Number of tweets tweeted in the past month</div>
          <ResponsiveContainer width="95%" height={350}>
            <LineChart
              width={730}
              height={250}
              data={noTweets.stats}
              margin={{
                top: 5, right: 30, left: 20, bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                name="Number of tweets"
                type="monotone"
                dataKey="count"
                stroke="#0099FF"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : ''}
      { (noJoinedUsers) ? (
        <div className={styles['graph-container']}>
          <div className={styles['graph-title']}>Number of accounts created in the past month</div>
          <ResponsiveContainer width="95%" height={350}>
            <LineChart
              data={noJoinedUsers.stats}
              margin={{
                top: 5, right: 30, left: 20, bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                name="Number of accounts"
                type="monotone"
                dataKey="count"
                stroke="#0099FF"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : ''}

      { (ageRanges) ? (
        <div className={styles['graph-container']}>
          <div className={styles['graph-title']}>Number of users within age ranges</div>
          <ResponsiveContainer width="95%" height={350}>
            <PieChart>
              <Tooltip />
              <Pie
                data={ageRanges.stats}
                dataKey="count"
                nameKey="name"
                cx="50%"
                cy="50%"
                label
              >
                {ageRanges.stats.map((entry, index) => (
                  <Cell
                    key={COLORS[index % COLORS.length]}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

        </div>
      ) : ''}
    </div>
  );
}

export default Dashboard;
