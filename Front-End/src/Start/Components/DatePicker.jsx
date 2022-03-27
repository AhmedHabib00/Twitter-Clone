import { React, useState } from 'react';
import './DatePicker.css';
import { YearPicker, MonthPicker, DayPicker } from 'react-dropdown-date';
import PropTypes from 'prop-types';

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

function DatePicker({ setDate }) {
  const [dateOfBirth, setDateOfBirth] = useState({
    day: '',
    month: '',
    year: '',
  });
  const today = new Date();
  const endYear = today.getFullYear();
  const startYear = endYear - 120;
  const newDate = formatDate(dateOfBirth);
  setDate(newDate);
  return (
    <div>
      <div className="date">
        <div className="month-container">
          <label className="year-label" htmlFor="month">
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
            classes="menu"
            optionClasses="option class"
            onChange={(month) => {
            // mandatory
              setDateOfBirth((date) => ({ ...date, month }));
            }}
          />
        </div>
        <div className="day-container">
          <label className="year-label" htmlFor="month">
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
            classes="menu"
            optionClasses="option classes"
            onChange={(day) => {
            // mandatory
              setDateOfBirth((date) => ({ ...date, day }));
            }}
          />
        </div>
        <div className="year-container">
          <label className="year-label" htmlFor="year">
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
            classes="menu"
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
};
