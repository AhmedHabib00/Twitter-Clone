import axios from 'axios';

// const { SERVER_URL } = 'http://localhost:8000';

export default async function signUpInfo(props) {
  const {
    name, email, birthdate,
  } = props;
  let response = '';
  try {
    response = await axios.post('http://localhost:8000/signup', {
      name,
      email,
      birthdate,

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

export async function signUpCode(props) {
  const {
    code, email,
  } = props;
  let response = '';
  try {
    response = await axios.post('http://localhost:8000/verification', {
      code,
      email,

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
const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(10);
export async function signUpPassword(props) {
  const {
    password, email,
  } = props;
  let response = '';
  const hash = bcrypt.hashSync(password, salt);
  try {
    response = await axios.post('http://localhost:8000/Password', {
      password: hash,
      email,

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
export async function signUpUsername(props) {
  const {
    username, email,
  } = props;
  let response = '';
  try {
    response = await axios.post('http://localhost:8000/username', {
      username,
      email,

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
