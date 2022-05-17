import { React, useState, useEffect } from 'react';
import { YearPicker, MonthPicker, DayPicker } from 'react-dropdown-date';
import PropTypes from 'prop-types';
import styles from './DatePicker.module.css';

const formatDate = (date) => {
  // formats a JS date to 'yyyy-mm-dd'
  const d = new Date(date.year, date.month, date.day);
  let month = `${d.getMonth() + 1}`;
  let day = `${d.getDate()}`;
  const year = d.getFullYear();

  if (month.length < 2) month = `0${month}`;
  if (day.length < 2) day = `0${day}`;

  return [year, month, day].join('-');
};

function DatePicker({ setDate, endYear, startYear }) {
  const [dateOfBirth, setDateOfBirth] = useState({
    day: '',
    month: '',
    year: '',
  });
  const newDate = formatDate(dateOfBirth);
  useEffect(() => {
    setDate(newDate);
  });
  return (
    <div data-testid="date-picker">
      <div className={styles.date}>
        <div className={styles['month-container']}>
          <label className={styles['year-label']} htmlFor="month">
            {' '}
            Month
          </label>
          <MonthPicker
            defaultValue=" "
            endYearGiven // mandatory if end={} is given in YearPicker
            year={dateOfBirth.year} // mandatory
            required // default is false
            value={dateOfBirth.month} // mandatory
            id="month"
            name="birthMonth"
            classes={styles.menu}
            optionClasses="option class"
            onChange={(month) => {
            // mandatory
              setDateOfBirth((date) => ({ ...date, month }));
            }}
          />
        </div>
        <div className={styles['day-container']}>
          <label className={styles['year-label']} htmlFor="month">
            {' '}
            Day
          </label>
          <DayPicker
            defaultValue=" "
            year={dateOfBirth.year} // mandatory
            month={dateOfBirth.month} // mandatory
            endYearGiven // mandatory if end={} is given in YearPicker
            required // default is false
            value={dateOfBirth.day} // mandatory
            id="day"
            name="birthDay"
            classes={styles.menu}
            optionClasses="option classes"
            onChange={(day) => {
            // mandatory
              setDateOfBirth((date) => ({ ...date, day }));
            }}
          />
        </div>
        <div className={styles['year-container']}>
          <label className={styles['year-label']} htmlFor="year">
            {' '}
            Year
          </label>
          <YearPicker
            defaultValue={' '}
            start={startYear} // default is 1900
            end={endYear} // default is current year
            reverse // default is ASCENDING
            required // default is false
            value={dateOfBirth.year} // mandatory
            id="year"
            name="birthYear"
            classes={styles.menu}
            optionClasses="option classes"
            onChange={(year) => {
            // mandatory
              setDateOfBirth((date) => ({ ...date, year }));
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default DatePicker;

DatePicker.propTypes = {
  setDate: PropTypes.func.isRequired,
  endYear: PropTypes.number.isRequired,
  startYear: PropTypes.number.isRequired,
};
