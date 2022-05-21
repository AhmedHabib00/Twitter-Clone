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

export async function getBookMarks() {
  let response = '';
  try {
    response = await axios.get(
      `${SERVER_URL}/users/${localStorage.userId}/bookmarks`,
      {
        headers: {
          'x-auth-token': localStorage.token,
        },
      },
    );
    // Success
    return (response);
  } catch (error) {
    return (error);
  }
}

export async function getFollowing(friendId) {
  let response = '';
  try {
    response = await axios.get(
      `${SERVER_URL}/users/${localStorage.userId}/following/${friendId}`,
      {
        headers: {
          'x-auth-token': localStorage.token,
        },
      },
    );
    // Success
    return (response);
  } catch (error) {
    return (error);
  }
}

export async function Follow(friendId) {
  let response = '';
  try {
    response = await axios.post(
      `${SERVER_URL}/users/${localStorage.userId}/following/${friendId}`,
      { },
      {
        headers: {
          'x-auth-token': localStorage.token,
        },
      },
    );
    // Success
    return (response);
  } catch (error) {
    return (error);
  }
}

export async function unFollow(friendId) {
  let response = '';
  try {
    response = await axios.delete(
      `${SERVER_URL}/users/${localStorage.userId}/following/${friendId}`,
      {
        headers: {
          'x-auth-token': localStorage.token,
        },
      },
    );
    // Success
    return (response);
  } catch (error) {
    return (error);
  }
}
