import axios from 'axios';

export default async function PostTweet(props) {
  const { images, value } = props;
  const gifArray = [];
  const imgArray = [];
  images.forEach((image) => {
    if (image.type === 'img') {
      imgArray.push(image.imgFile);
    } else {
      gifArray.push(image.imageUrl);
    }
  });
  let response = '';
  try {
    response = await axios.post('http://localhost:8000/Tweet', {
      content: value,
      media: imgArray,
      gifs: gifArray,
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
