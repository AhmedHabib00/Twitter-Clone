import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './Tweet.module.css';

function Tweet() {
  const { id } = useParams();
  return (<div className={styles.tweet}>{id}</div>);
}

export default Tweet;
