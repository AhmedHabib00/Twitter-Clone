import React, { useEffect, useState } from 'react';
import { Pagination } from '@mui/material';
import PropTypes from 'prop-types';
import {
  blockUser, getListofUsers, deleteUser, unBlockUser,
} from '../Services/adminServices';
import styles from './AdminUsers.module.css';
import UsersFeed from '../Components/ListofUsers/UsersFeed';
import SearchBar from '../Components/SearchBar/SearchBar';
import PopupPage from '../Home/Components/PopupPage';
import DatePicker from '../Start/SignUp/Components/DatePicker';
import validateDate from './dateValidation';

function AdminUsers({ state, enableStyleSwitching }) {
  const [pages, setPages] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [listOfUsers, setListOfUsers] = useState([]);
  const [openDeleteUser, setOpenDeleteUser] = useState(false);
  const [previousState, setPreviousState] = useState('');
  const [userToDelete, setUserToDelete] = useState('');
  const [userToRemove, setUserToRemove] = useState('');
  const [initialUserToRemove, setInitialUserToRemove] = useState('');
  const [dateError, setDateError] = useState('');
  const [date, setDate] = useState('');
  const [isBlockClicked, setIsBlockClicked] = useState(false);
  const [searchVal, setSearchVal] = useState('');

  const handleSearchChange = (value) => {
    setSearchVal(value);
    (async () => {
      const resp = await getListofUsers(1, state, value);
      setPages(resp.length);
      setListOfUsers(resp.Info[0].data);
    })();
  };

  const refreshUserList = () => {
    let usersData = [...listOfUsers];
    usersData = usersData.filter((user) => user.id !== userToRemove);
    setListOfUsers(usersData);
    if (!usersData.length) {
      (async () => {
        const resp = await getListofUsers(currentPage, state, searchVal);
        console.log(resp);
        setPages(resp.length);
        setListOfUsers(resp.Info[0].data);
      })();
    }
  };

  useEffect(() => {
    if (previousState !== state) {
      (async () => {
        const resp = await getListofUsers(currentPage, state, searchVal);
        setPages(resp.length);
        setListOfUsers(resp.Info[0].data);
      })();
      setPreviousState(state);
    }
    if (initialUserToRemove !== userToRemove) {
      setInitialUserToRemove(userToRemove);
      refreshUserList();
    }
  }, [state, userToRemove]);

  const handleClosePopup = () => {
    setOpenDeleteUser(false);
    setIsBlockClicked(false);
    document.getElementsByTagName('body')[0].style.setProperty('overflow-y', 'scroll');
  };

  const handleDeleteCLick = (userId) => {
    const { username } = listOfUsers.filter((user) => user.id === userId)[0];
    setUserToDelete({
      id: userId,
      username,
    });
    setOpenDeleteUser(true);
  };

  const handleDeleteUser = (userId) => {
    (async () => {
      await deleteUser(userId);
    })();
    setUserToRemove(userId);
    handleClosePopup();
  };

  const handleBlockClick = (userId) => {
    if (state === '') {
      setIsBlockClicked(true);
      const userInfo = listOfUsers.filter((user) => user.id === userId)[0];
      setUserToDelete({
        id: userId,
        username: userInfo.username,
      });
    } else {
      (async () => {
        await unBlockUser(userId);
        setUserToRemove(userId);
      })();
    }
  };

  const handleBlockUser = () => {
    const response = validateDate(date);
    if (response.status === 200) {
      (async () => {
        await blockUser(userToDelete.id, date);
      })();
      handleClosePopup();
      setUserToRemove(userToDelete.id);
    } else {
      setDateError(response.error);
    }
  };

  const changePage = (e, value) => {
    setCurrentPage(value);
    (async () => {
      const resp = await getListofUsers(value, state, searchVal);
      setPages(resp.length);
      setListOfUsers(resp.Info[0].data);
    })();
  };

  return (
    <div className={styles['admin-users']}>
      <PopupPage SetTrigger={setOpenDeleteUser} trigger={openDeleteUser}>
        <div className={styles['user-popup']}>
          <div className={styles['user-popup-text']}>
            {' '}
            Are you Sure you want to delete
            {' '}
            <span className={styles['user-popup-span']}>
              @
              {userToDelete.username}
            </span>
            ?
          </div>
          <div className={styles['buttons-container']}>
            <button type="button" onClick={handleClosePopup} className={styles['cancel-button']}>Cancel</button>
            <button type="button" onClick={() => handleDeleteUser(userToDelete.id)} className={styles['delete-button']}>Delete</button>
          </div>
        </div>
      </PopupPage>

      <PopupPage SetTrigger={setIsBlockClicked} trigger={isBlockClicked}>
        <div className={styles['unblock-popup-container']}>
          <b className={styles['unblock-popup-text']}>Select a date until unblock</b>
          <DatePicker setDate={setDate} startYear={2022} endYear={2028} />
          <b className={styles['unblock-popup-error-message']}>{dateError}</b>
          <button type="button" onClick={handleBlockUser} className={[styles['delete-button'], styles['unblock-popup-button']].join(' ')}>Block</button>
        </div>
      </PopupPage>

      <SearchBar placeHolder="Search by username" searchValue={handleSearchChange} delay={1500} />
      {(listOfUsers.length) ? (
        <UsersFeed
          data={listOfUsers}
          buttonStyle="tweetblockbutton"
          buttonStyleClicked="tweetunblockbutton"
          onButtonClick={handleBlockClick}
          onProfileClick={handleDeleteCLick}
          enableStyleSwitching={enableStyleSwitching}
        />
      )
        : <b>No results found</b>}
      {(!(openDeleteUser || isBlockClicked))
        ? (
          <div className={styles.pagination}>
            {(pages >= 2) ? <Pagination count={pages} onChange={changePage} color="primary" /> : ''}
          </div>
        ) : ''}
    </div>
  );
}

AdminUsers.propTypes = {
  state: PropTypes.string.isRequired,
  enableStyleSwitching: PropTypes.bool,
};

AdminUsers.defaultProps = {
  enableStyleSwitching: true,
};
export default AdminUsers;
