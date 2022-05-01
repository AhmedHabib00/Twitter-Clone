import React, { useEffect, useState } from 'react';
import { Pagination } from '@mui/material';
import PropTypes from 'prop-types';
import { getListofUsers } from '../Services/adminServices';
import styles from './AdminUsers.module.css';
import UsersFeed from '../Components/ListofUsers/UsersFeed';
import SearchBar from '../Components/SearchBar/SearchBar';
import PopupPage from '../Home/Components/PopupPage';

function AdminUsers({ state }) {
  const [pages, setPages] = useState(3);
  const [listOfUsers, setListOfUsers] = useState(undefined);
  const [query, setQuery] = useState('');
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [openDeleteUser, setOpenDeleteUser] = useState(false);
  const [deleteUser, setDeleteUser] = useState('');

  const onSearchChange = (value) => {
    (async () => {
      const resp = await getListofUsers(state, value);
      setPages(resp.pages);
      setListOfUsers(resp.UsersList);
    })();
  };

  useEffect(() => {
    if (isFirstTime) {
      (async () => {
        const resp = await getListofUsers(state, '');
        setPages(resp.pages);
        setListOfUsers(resp.UsersList);
      })();
      setIsFirstTime(false);
    }
    const timeOutId = setTimeout(() => onSearchChange(query), 1500);
    return () => clearTimeout(timeOutId);
  }, [query]);

  const handleProfileCLick = (userId) => {
    const { userName } = listOfUsers.filter((user) => user.id === userId)[0];
    setDeleteUser({
      id: userId,
      userName,
    });
    setOpenDeleteUser(true);
  };
  const handleButtonClick = (userId) => {
    let usersData = [...listOfUsers];
    usersData = usersData.filter((user) => user.id !== userId);
    setListOfUsers(usersData);
    if (!usersData.length) {
      (async () => {
        const resp = await getListofUsers(state, '');
        setPages(resp.pages);
        setListOfUsers(resp.UsersList);
      })();
    }
  };
  const changePage = (e, value) => {
    console.log(value);
  };

  const handleClosePopup = () => {
    setOpenDeleteUser(false);
    document.getElementsByTagName('body')[0].style.setProperty('overflow-y', 'scroll');
  };

  const handleDeleteUser = (userId) => {
    console.log(userId);
    handleClosePopup();
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
              {deleteUser.userName}
            </span>
            ?
          </div>
          <div className={styles['buttons-container']}>
            <button type="button" onClick={handleClosePopup} className={styles['cancel-button']}>Cancel</button>
            <button type="button" onClick={() => handleDeleteUser(deleteUser.id)} className={styles['delete-button']}>Delete</button>
          </div>
        </div>
      </PopupPage>
      <SearchBar placeHolder="Search by username" searchValue={setQuery} />
      {(listOfUsers) ? (
        <UsersFeed
          data={listOfUsers}
          buttonStyle="tweetblockbutton"
          buttonStyleClicked="tweetunblockbutton"
          onButtonClick={handleButtonClick}
          onProfileClick={handleProfileCLick}
        />
      )
        : <b>No results found</b>}
      <div className={styles.pagination}>
        {(pages >= 2) ? <Pagination count={pages} onChange={changePage} color="primary" /> : ''}
      </div>
    </div>
  );
}

AdminUsers.propTypes = {
  state: PropTypes.string.isRequired,
};

export default AdminUsers;
