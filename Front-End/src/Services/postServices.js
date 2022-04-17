import axios from 'axios';

export default async function DisplayPost(props) {
  const { id, noOfLike } = props;

  let response = '';
  try {
    response = await axios.post('http://localhost:8000/posts', {
      id,
      noOfLike: (noOfLike + 1),

    });
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
