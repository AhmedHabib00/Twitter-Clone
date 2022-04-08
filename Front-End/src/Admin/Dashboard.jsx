import React, { useEffect, useState } from 'react';
import {
  BarChart, CartesianGrid, XAxis, YAxis,
  Tooltip, Legend, Bar, ResponsiveContainer,
  LineChart, Line, PieChart, Pie,
} from 'recharts';
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
  const [noMostFollowed, setNoMostFollowed] = useState();
  const [noTweets, setNoTweets] = useState();
  const [noJoinedUsers, setNoJoinedUsers] = useState();
  const [ageRanges, setAgeRanges] = useState();
  useEffect(() => {
    (async () => {
      const resp = await getStats();
      setNoUsers(resp.noUsers);
      setNoBanned(resp.noBanned);
      setTweetsRatio(resp.ratioTweets);
      setNoMostFollowed(resp.noMostFollowed);
      setNoTweets(resp.noTweets);
      setNoJoinedUsers(resp.noJoined);
      setAgeRanges(resp.noAgeUsers);
    })();
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
      { (noMostFollowed) ? (
        <ResponsiveContainer width="50%" height={350}>
          <BarChart
            data={noMostFollowed.stats}
            layout="vertical"
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      ) : ''}
      { (noTweets) ? (
        <ResponsiveContainer width="80%" height={350}>
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
            <Line type="monotone" dataKey="count" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      ) : ''}
      { (noJoinedUsers) ? (
        <ResponsiveContainer width="80%" height={350}>
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
            <Line type="monotone" dataKey="count" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      ) : ''}
      { (ageRanges) ? (
        <ResponsiveContainer width="80%" height={350}>
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
            <Line type="monotone" dataKey="count" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      ) : ''}
      { (ageRanges) ? (
        <ResponsiveContainer width="80%" height={350}>
          <PieChart>
            <Tooltip />
            <Pie data={ageRanges.stats} dataKey="count" nameKey="name" cx="50%" cy="50%" fill="#8884d8" label />
          </PieChart>
        </ResponsiveContainer>
      ) : ''}
    </div>
  );
}

export default Dashboard;
