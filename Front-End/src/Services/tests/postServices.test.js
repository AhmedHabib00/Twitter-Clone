import getStats from '../postServices';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import '@testing-library/jest-dom';

describe('testing post apis', () => {
  let username;
  let displayname;
  let content;
  let isLiked;
  let noOfLike;
  let noOfReplies;
  let noOfRetweets;
  const setusername = (data) => {
    username = data;
  };

  const setdisplayname = (data) => {
    displayname = data;
  };

  const setcontent = (data) => {
    content = data;
  };
  const setisliked = (data) => {
    isLiked = data;
  };
  const setnoOfLike = (data) => {
    noOfLike = data;
  };
  const setnoOfReplies = (data) => {
    noOfReplies = data;
  };
  const setnoOfRetweets = (data) => {
    noOfRetweets = data;
  };
  it('test post props', async () => {
    getStats({
      setusername,
      setdisplayname,
      setcontent,
      setisliked,
      setnoOfLike,
      setnoOfReplies,
      setnoOfRetweets,
    }).then((response) => {
      expect(response.status).toBe(201);
    });
    console.log(username);
    console.log(displayname);
    console.log(content);
    console.log(isLiked);
    console.log(noOfLike);
    console.log(noOfReplies);
    console.log(noOfRetweets);
  });
});
