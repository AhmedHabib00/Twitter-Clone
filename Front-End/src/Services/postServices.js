import axios from 'axios';
import configData from '../config/production.json';

const { SERVER_URL } = configData;

export default async function GetPostsArray(page) {
  let response = '';
  const number = 10;
  try {
    response = await axios.get(
      `${SERVER_URL}/tweets/TimelineTweets`,
      {
        params: {
          page,
          size: number,
        },
        headers: {
          'x-auth-token': `${localStorage.token}`,
        },
      },
    );
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

export async function handleLikes(props) {
  let response = '';
  try {
    response = await axios.put(`${SERVER_URL}/tweets/${props}/like`, {}, {
      headers: {
        'x-auth-token': localStorage.token,
      },
    });
    // Success
    // console.log(response);
    return (response);
  } catch (error) {
    if (error.response) {
      /*
          * The request was made and the server responded with a
          * status code that falls out of the range of 2xx
          */
      //   console.log(error.response.data);
      //   console.log(error.response.status);
      //   console.log(error.response.headers);
      return (error.response);
    } if (error.request) {
      /*
          * The request was made but no response was received, `error.request`
          * is an instance of XMLHttpRequest in the browser and an instance
          * of http.ClientRequest in Node.js
          */
    //   console.log(error.request);
    } else {
      // Something happened in setting up the request and triggered an Error
    //   console.log('Error', error.message);
    }
    // console.log(error);
    return (response);
  }
}

export async function SendRetweets(TweetId) {
  let response = '';
  try {
    response = await axios.post(`${SERVER_URL}/tweets/${TweetId}/retweet`, {}, {
      headers: {
        'x-auth-token': localStorage.token,
      },
    });
    // Success
    // console.log(response);
    return (response);
  } catch (error) {
    if (error.response) {
      /*
          * The request was made and the server responded with a
          * status code that falls out of the range of 2xx
          */
      //   console.log(error.response.data);
      //   console.log(error.response.status);
      //   console.log(error.response.headers);
      return (error.response);
    } if (error.request) {
      /*
          * The request was made but no response was received, `error.request`
          * is an instance of XMLHttpRequest in the browser and an instance
          * of http.ClientRequest in Node.js
          */
    //   console.log(error.request);
    } else {
      // Something happened in setting up the request and triggered an Error
    //   console.log('Error', error.message);
    }
    // console.log(error);
    return (response);
  }
}
export async function addToBookmark(props) {
  let response = '';
  try {
    response = await axios.post(`${SERVER_URL}/users/${localStorage.userId}/bookmarks/${props}`, {
      headers: {
        'x-auth-token': localStorage.token,
      },
    });

    if (response.data.data.bookmarked) return (response);
    response = await axios.delete(`${SERVER_URL}/users/${localStorage.userId}/bookmarks/${props}`, {
      headers: {
        'x-auth-token': localStorage.token,
      },
    });
    return response;
  } catch (error) {
    if (error.response) {
      /*
          * The request was made and the server responded with a
          * status code that falls out of the range of 2xx
          */
      //   console.log(error.response.data);
      //   console.log(error.response.status);
      //   console.log(error.response.headers);
      return (error.response);
    } if (error.request) {
      /*
          * The request was made but no response was received, `error.request`
          * is an instance of XMLHttpRequest in the browser and an instance
          * of http.ClientRequest in Node.js
          */
    //   console.log(error.request);
    } else {
      // Something happened in setting up the request and triggered an Error
    //   console.log('Error', error.message);
    }
    // console.log(error);
    return (response);
  }
}
