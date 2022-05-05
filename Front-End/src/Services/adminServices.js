import axios from 'axios';
import configData from '../config/production.json';

const { SERVER_URL } = configData;

export default async function getNoUsers() {
  let response = '';
  try {
    response = await axios.get(
      `${SERVER_URL}/admins/statistics/noUsers`,
      {
        headers: {
          'x-auth-token': localStorage.token,
        },
      },
    ).then((res) => res.data.noUsers);
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

export async function getRatioTweets() {
  let response = '';
  try {
    response = await axios.get(
      `${SERVER_URL}/admins/statistics/ratioTweets`,
      {
        headers: {
          'x-auth-token': localStorage.token,
        },
      },
    ).then((res) => res.data.ratioTweets);
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
export async function getNoTweets() {
  let response = '';
  try {
    response = await axios.get(
      `${SERVER_URL}/admins/statistics/noTweets`,
      {
        headers: {
          'x-auth-token': localStorage.token,
        },
      },
    ).then((res) => res.data.noTweets);
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

export async function getNoAgeUsers() {
  let response = '';
  try {
    response = await axios.get(
      `${SERVER_URL}/admins/statistics/noAgeUsers`,
      {
        headers: {
          'x-auth-token': localStorage.token,
        },
      },
    ).then((res) => res.data.noAgeUsers);
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

export async function getNoJoined() {
  let response = '';
  try {
    response = await axios.get(
      `${SERVER_URL}/admins/statistics/noJoined`,
      {
        headers: {
          'x-auth-token': localStorage.token,
        },
      },
    ).then((res) => res.data.noJoined);
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

export async function getNoMostFollowed() {
  let response = '';
  try {
    response = await axios.get(
      `${SERVER_URL}/admins/statistics/noMostFollowed`,
      {
        headers: {
          'x-auth-token': localStorage.token,
        },
      },
    ).then((res) => res.data.noMostFollowed);
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

export async function getNoBanned() {
  let response = '';
  try {
    response = await axios.get(
      `${SERVER_URL}/admins/statistics/noBanned`,
      {
        headers: {
          'x-auth-token': localStorage.token,
        },
      },
    ).then((res) => res.data.noBanned);
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

export async function getListofUsers(page, state, search) {
  let response = '';
  try {
    response = await axios.get(
      `${SERVER_URL}/admins/users/?size=5&page=${page}&search=${search}&state=${state}`,
      {
        headers: {
          'x-auth-token': localStorage.token,
        },
      },
    ).then((res) => res.data);
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

export async function blockUser(userId) {
  let response = '';
  try {
    response = await axios.post(
      `${SERVER_URL}/admins/${localStorage.userId}/banning/${userId}/`,
      {
        end_date: '2022-05-28',
        headers: {
          'x-auth-token': localStorage.token,
        },
      },
    ).then((res) => res.data);
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

export async function unBlockUser(userId) {
  let response = '';
  try {
    response = await axios.delete(
      `${SERVER_URL}/admins/${localStorage.userId}/banning/${userId}/`,
      {
        headers: {
          'x-auth-token': localStorage.token,
        },
      },
    ).then((res) => res.data);
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

export async function deleteUser(userId) {
  let response = '';
  try {
    response = await axios.delete(
      `${SERVER_URL}/admins/${localStorage.userId}/deleting/${userId}/`,
      {
        headers: {
          'x-auth-token': localStorage.token,
        },
      },
    ).then((res) => res.data);
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
