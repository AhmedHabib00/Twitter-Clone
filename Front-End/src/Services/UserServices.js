import axios from 'axios';
import configData from '../config/production.json';

const { SERVER_URL } = configData;

export default async function getUserInfo(id) {
  let response = '';
  try {
    response = await axios.get(
      `${SERVER_URL}/user/${id}/profile_settings`,
      {
        headers: {
          'x-auth-token': localStorage.token,
        },
      },
    );
    // Success
    return (response.data);
  } catch (error) {
    return (error);
  }
}
