import axios from 'axios';

export default async function getStats(props) {
  const { setNoUsers, setNoBanned, setTweetsRatio } = props;
  let response = '';
  try {
    response = await axios.get('http://localhost:8000/statData').then((res) => {
      setNoUsers(res.data[0].noUsers);
      setTweetsRatio(res.data[0].ratioTweets);
      setNoBanned(res.data[0].noBanned);
    });
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
