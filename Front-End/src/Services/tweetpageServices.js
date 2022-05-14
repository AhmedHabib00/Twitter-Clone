import axios from 'axios';
import configData from '../config/production.json';

const { SERVER_URL } = configData;

export default async function GetUsersArray(id) {
  let response = '';
  try {
    response = await axios.get(`http://${SERVER_URL}/tweets/repliers/${id}`, {
      headers: {
        'x-auth-token': `${localStorage.token}`,
      },
    });
    // Success
    return (response);
  } catch (error) {
    // if (error.response) {
    //   // console.log(error.response.data);
    //   // console.log(error.response.status);
    //   // console.log(error.response.headers);
    // } else if (error.request) {
    //   console.log(error.request);
    // } else {
    //   console.log('Error', error.message);
    // }
    // console.log(error);
  }
  return response;
}
export async function GetPost(id) {
  let response = '';
  try {
    response = await axios.get(`http://${SERVER_URL}/tweets/SingleTweet/${id}`, {
      headers: {
        'x-auth-token': `${localStorage.token}`,
      },
    });
    // Success
    return (response);
  } catch (error) {
    // if (error.response) {
    //   // console.log(error.response.data);
    //   // console.log(error.response.status);
    //   // console.log(error.response.headers);
    // } else if (error.request) {
    //   console.log(error.request);
    // } else {
    //   console.log('Error', error.message);
    // }
    // console.log(error);
  }
  return response;
}
export async function GetRepliesArray(id) {
  let response = '';
  try {
    response = await axios.get(`http://${SERVER_URL}/tweets/repliesArray/${id}`, {
      headers: {
        'x-auth-token': `${localStorage.token}`,
      },
    });
    // Success
    return (response);
  } catch (error) {
    // if (error.response) {
    //   // console.log(error.response.data);
    //   // console.log(error.response.status);
    //   // console.log(error.response.headers);
    // } else if (error.request) {
    //   console.log(error.request);
    // } else {
    //   console.log('Error', error.message);
    // }
    // console.log(error);
  }
  return response;
}
