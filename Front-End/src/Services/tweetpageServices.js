import axios from 'axios';

export default async function GetUsersArray() {
  let response = '';
  try {
    response = await axios.get('http://localhost:8000/usersList');
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

export async function GetRelpiesArray() {
  let response = '';
  try {
    response = await axios.get('http://localhost:8000/TweetPage');
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
