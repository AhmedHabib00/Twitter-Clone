import axios from 'axios';

export default async function getStats() {
  let response = '';
  try {
    response = await axios.get('http://localhost:8000/statData').then((res) => res.data);
    return (response);
  } catch (error) {
    if (error.response) {
      /*
        * The request was made and the server responded with a
        * status code that falls out of the range of 2xx
        */
      return (error.response);
    }
  }
  return (response);
}

export async function getListofUsers() {
  let response = '';
  try {
    response = await axios.get('http://localhost:8000/ListofUsers').then((res) => res.data);
    return (response);
  } catch (error) {
    if (error.response) {
      /*
        * The request was made and the server responded with a
        * status code that falls out of the range of 2xx
        */
      return (error.response);
    }
  }
  return (response);
}
