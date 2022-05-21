import React from 'react';
import { PropTypes } from 'prop-types';
import styles from './Loader.module.css';
/**
 * This component for the loader
 * @param {number} dimension gives the dimension of the loader
 * @returns the loader components
 */
function Loader({ dimension }) {
  return (

    <div className={styles['spinner-container']}>
      <div className={styles['loading-spinner']} style={{ width: dimension, height: dimension }} />
    </div>
  );
}

Loader.propTypes = {
  dimension: PropTypes.number,
};

Loader.defaultProps = {
  dimension: 50,
};
export default Loader;
