import axios from 'axios';
import configData from '../config/production.json';

const { SERVER_URL } = configData;

export default async function getStats() {
  let response = '';
  try {
    response = await axios.get(`${SERVER_URL}/admins/statistics`).then((res) => res.data);
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
