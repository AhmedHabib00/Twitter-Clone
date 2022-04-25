import React from 'react';
import PropTypes from 'prop-types';
import styles from './stats.module.css';

function NumberStat({
  type, description, value,
}) {
  return (
    <div className={styles['number-stat']}>
      <h1 className={styles['number-stat-type']}>{type}</h1>
      <h2 className={styles['number-stat-description']}>{description}</h2>
      <h3 className={styles['number-stat-val']}>{value}</h3>
    </div>
  );
}

NumberStat.propTypes = {
  type: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};
export default NumberStat;
