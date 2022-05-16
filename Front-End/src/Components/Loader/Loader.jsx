import React from 'react';
import styles from './Loader.module.css';

function Loader() {
  return (

    <div className={styles['spinner-container']}>
      <div className={styles['loading-spinner']} />
    </div>
  );
}
export default Loader;
