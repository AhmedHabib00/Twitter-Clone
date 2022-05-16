/**
 * This function is used to validate the date and make sures it is after the current date.
 * @param {object} values contains the email and code
 * @returns errors
 */
export default function validateDate(date) {
  const today = new Date();
  const dateInt = [];
  let numstr = '';
  for (let i = 0; i < date.length; i += 1) {
    if (date.charAt(i) === '-') {
      dateInt.push(Number(numstr));
      numstr = '';
    } else {
      numstr += date.charAt(i);
    }
  }
  dateInt.push(Number(numstr));

  if (dateInt[0] > today.getFullYear()) {
    return {
      status: 200,
    };
  }

  if (dateInt[0] === today.getFullYear()) {
    if (dateInt[1] > (today.getMonth() + 1)) {
      return {
        status: 200,
      };
    }
    if (dateInt[1] === (today.getMonth() + 1)) {
      if (dateInt[2] > (today.getDay())) {
        return {
          status: 200,
        };
      }
    }
  }
  return {
    status: 400,
    error: 'You should select a date after today',
  };
}
