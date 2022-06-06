import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import PropTypes from 'prop-types';
import ImagePopUp from './ImagePopUp';
import UsersFeed from '../../Components/ListofUsers/UsersFeed';
import User from '../../Components/ListofUsers/User';
import PopupPage from './PopupPage';
import styles from './Post.module.css';
import ImageBox from './ImageBox';
import GetUsersArray from '../../Services/tweetpageServices';

/**
 *
 * @param {Number} id     Post Id
 * @param {String} displayName      User posted display name (user first name).
 * @param {String} userName     User posted user name (user full name).
 * @param {String} content      Posted text.
 * @param {Array} URLs      array of the urls which will contain images & gifs.
 * @param {Bool} isReplying     bool to check if it's a reply.
 * @param {String} url      user profile image.
 * @param {Bool} switchEnable      to handel display of mentioned users.
 * @param {Function} onReplyButtonClick to check if the user is replying to the post.
 * @returns div element containing the whispered tweet body.
 */

function PostBody({
  id, content, URLs, userName, displayName, isReplying, url, switchEnabled, onReplyButtonClick,
}) {
  const navigate = useNavigate();
  const [userSelectionPopUp, setUserSelectionPopUp] = useState(false);
  const [imagePopUp, setImagePopUp] = useState(false);
  const [images, setImages] = useState([]);
  const [listOfUsers, setListOfUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  useEffect(() => {
    const tempURLs = [...URLs];
    tempURLs.forEach((element, index) => {
      // eslint-disable-next-line no-param-reassign
      tempURLs[index] = {
        id: index,
        imageUrl: element,
      };
    });
    setImages(tempURLs);
    if (isReplying) {
      (async () => {
        const usersArray = await GetUsersArray(id);
        if (usersArray.status === 200) {
          if (usersArray.data !== 'no users available to reply to.') {
            setListOfUsers(usersArray.data);
            setSelectedUsers(usersArray.data);
          }
        }
      })();
    }
  }, [URLs, isReplying]);
  const handleUsersDisplay = () => {
    let userString = `@ ${userName}`;
    selectedUsers.forEach((user) => {
      userString = `${userString} @${user.userName}`;
    });
    return <span className={styles['blue-text']}>{userString}</span>;
  };
  const handleSelectUser = (userId, state) => {
    const tempUserList = [...listOfUsers];
    const tempReplyingTo = [...selectedUsers];
    let updateArray = [];
    if (state) {
      updateArray = [...tempReplyingTo, listOfUsers.filter((user) => (user.id === userId))[0]];
      setSelectedUsers(updateArray);
      tempUserList.filter((user) => (user.id === userId))[0].active = true;
    } else {
      updateArray = tempReplyingTo.filter((user) => (user.id !== userId));
      setSelectedUsers(updateArray);
      tempUserList.filter((user) => (user.id === userId))[0].active = false;
    }
    setListOfUsers(tempUserList);
    onReplyButtonClick(updateArray);
  };
  return (
    <div className={(switchEnabled) ? styles['postbody-switching'] : ''}>
      {(isReplying) ? (

        <div role="button" tabIndex={0} onClick={() => setUserSelectionPopUp(true)}>
          Replying to
          {' '}

          {handleUsersDisplay()}
        </div>
      ) : ''}
      <div>
        <div
          data-testid="content-render-test"
          className={styles.postheaderdescription}
          role="button"
          tabIndex={0}
          onClick={() => {
            navigate(`/tweet/${id}`);
          }}
        >
          <p>{content}</p>
        </div>

        <div
          data-testid="images-render-test"
          role="button"
          tabIndex={0}
          onClick={() => setImagePopUp(!imagePopUp)}
        >
          <ImageBox images={images} deleteEnabled />
        </div>
      </div>
      <PopupPage
        trigger={userSelectionPopUp}
        SetTrigger={setUserSelectionPopUp}
        isCloseEnabled={false}
        isUserSelector
      >
        <div>
          <User
            profileid={id}
            displayname={displayName}
            username={userName}
            url={url}
            isButtonActive
            hasCheckbox
            isButtonDisabled
          />
          <hr />
          <h2 className={styles['tweet-header']}>Others in this conversation</h2>
          <UsersFeed
            data={listOfUsers}
            onButtonClick={handleSelectUser}
            hasCheckbox
          />
        </div>
      </PopupPage>
      <div>
        {images[0] && (
        <ImagePopUp name="body" trigger={imagePopUp} setTrigger={setImagePopUp}>
          <Carousel>
            {images.map((element) => (
              <div key={element.id}>
                <img className={styles.imgpopup} src={element.imageUrl} alt="pic1" />
              </div>
            ))}
          </Carousel>
        </ImagePopUp>
        )}
      </div>

    </div>
  );
}

PostBody.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  URLs: PropTypes.arrayOf(PropTypes.string).isRequired,
  isReplying: PropTypes.bool,
  switchEnabled: PropTypes.bool,
  userName: PropTypes.string.isRequired,
  onReplyButtonClick: PropTypes.func,
  displayName: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

PostBody.defaultProps = {
  isReplying: false,
  switchEnabled: false,
  onReplyButtonClick: function tempFunc() {},
};
export default PostBody;
