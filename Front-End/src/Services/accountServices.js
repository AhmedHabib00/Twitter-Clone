import axios from 'axios';
import configData from '../config/production.json';

const { SERVER_URL } = configData;
/**
 * This function is used to post the name email and birthdate
 * to the backend
 * @param {object} props  list of name, email, birthdate
 * @returns response
 */
export default async function signUpInfo(props) {
  const {
    name, email, birthdate,
  } = props;
  let response = '';
  try {
    response = await axios.post(`${SERVER_URL}/signUp`, {
      name,
      email,
      birthdate,
    }, {
      headers: {
        'content-type': 'application/json',
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
/**
 * This function is used to post the code and email
 * to the backend
 * @param {object} props  list of code and email
 * @returns response
 */
export async function signUpCode(props) {
  const {
    code, email,
  } = props;
  let response = '';
  try {
    response = await axios.patch(`${SERVER_URL}/signUp/verifyEmail`, {
      code,
      email,
    }, {
      headers: {
        'content-type': 'application/json',
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

/**
 * This function is used to post the password and email
 * to the backend after encryption
 * @param {object} props  list of password and email
 * @returns response
 */
export async function signUpPassword(props) {
  const {
    password, email,
  } = props;
  let response = '';
  try {
    response = await axios.patch(`${SERVER_URL}/signUp/setPassword`, {
      password,
      email,
    }, {
      headers: {
        'x-auth-token': localStorage['temp-token'],
      },
    });

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
/**
 * This function is used to post the username and email
 * to the backend
 * @param {object} props  list of username, email
 * @returns response
 */
export async function signUpUsername(props) {
  const {
    username, email,
  } = props;
  let response = '';
  try {
    response = await axios.post(`${SERVER_URL}/signUp/setUsername`, {
      username,
      email,
    }, {
      headers: {
        'x-auth-token': localStorage['temp-token'],
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

export async function Login(props) {
  const {
    email,
  } = props;
  let response = '';
  try {
    response = await axios.post(`${SERVER_URL}/loginEmail`, {
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

export async function LoginPassword(props) {
  const {
    emailOrUsername, password,
  } = props;
  let response = '';
  try {
    response = await axios.post(`${SERVER_URL}/login`, {
      emailOrUsername,
      password,
    }, {
      headers: {
        'content-type': 'application/json',
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

export async function authGoogle() {
  let response = '';
  try {
    response = await axios.get(`${SERVER_URL}/auth/google`);
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
export async function authFacebook() {
  let response = '';
  try {
    response = await axios.get(`${SERVER_URL}/auth/facebook`);
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

export async function searchEmail(props) {
  const {
    emailOrUsername,
  } = props;
  let response = '';
  try {
    response = await axios.post(`${SERVER_URL}/forgotPassword`, {
      emailOrUsername,

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
export async function verifyForgotPassword(props) {
  const {
    emailOrUsername, code,
  } = props;
  let response = '';
  try {
    response = await axios.post(`${SERVER_URL}/forgotPassword/codeVerification`, {
      headers: {
        'content-type': 'application/json',
      },
      emailOrUsername,
      code,

    });
    // Success
    // console.log(response);
    const { token } = response.headers['x-auth-token'];
    localStorage.setItem('token', token);
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
export async function setNewPassword(props) {
  let response = '';
  try {
    response = await axios.post(`${SERVER_URL}/forgotPassword/newPassword`, {
      password: props,
    }, {
      headers: {
        'x-auth-token': localStorage['temp-token'],
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

export async function getClientRole() {
  let response = '';
  try {
    response = await axios.get(`${SERVER_URL}/auth/getRole`, {
      headers: {
        'x-auth-token': localStorage.token,
      },
    }).then((res) => res.data);
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
