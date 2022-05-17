import axios from 'axios';
import configData from '../config/production.json';

const { SERVER_URL } = configData;

export async function PostTweet(props) {
  console.log(props);
  const {
    images, value, replyId, usersList,
  } = props;
  const formData = new FormData();
  formData.append('content', value);
  formData.append('replyId', replyId);
  if (images.length === 0) {
    formData.append('images', []);
    formData.append('gifs', '');
  }
  if (images.length !== 0 && images[0].type !== 'gif') {
    formData.append('gifs', '');
  }
  if (usersList) {
    formData.append('users', usersList);
  } else {
    formData.append('users', []);
  }
  images.forEach((image) => {
    if (image.type === 'img') {
      formData.append('images', image.imgFile);
    } else {
      formData.delete('gifs');
      formData.append('gifs', image.imageUrl);
    }
  });

  let response = '';
  try {
    response = await axios.post(
      `${SERVER_URL}/tweets`,
      formData,
      {
        headers: {
          'x-auth-token': localStorage.token,
          'Content-Type': 'multipart/form-data',
          // Accept: '*/*',
        },
      },
    );
    // Success
    return (response);
  } catch (error) {
    if (error.response) {
      /*
          * The request was made and the server responded with a
          * status code that falls out of the range of 2xx
          */
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
    return (response);
  }
}

export async function GetGifs(url) {
  let response = '';
  try {
    response = await axios.get(url).then((res) => res.data);
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
