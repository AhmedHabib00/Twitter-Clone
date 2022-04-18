import axios from 'axios';

export async function PostTweet(props) {
  const { images, value, replyId } = props;
  let gifArray = '';
  const imgArray = [];
  images.forEach((image) => {
    if (image.type === 'img') {
      imgArray.push(image.imgFile);
    } else {
      gifArray = image.imageUrl;
    }
  });
  let response = '';
  try {
    response = await axios.post('http://localhost:8000/Tweet', {
      content: value,
      replyId,
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
