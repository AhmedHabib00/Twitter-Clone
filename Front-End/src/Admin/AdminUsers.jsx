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

function AdminUsers({ state }) {
  const [pages, setPages] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [listOfUsers, setListOfUsers] = useState([]);
  const [query, setQuery] = useState('');
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [openDeleteUser, setOpenDeleteUser] = useState(false);
  const [userToDelete, setUserToDelete] = useState('');

  const onSearchChange = (value) => {
    (async () => {
      const resp = await getListofUsers(1, state, value);
      setPages(resp.length);
      setListOfUsers(resp.Info[0].data);
    })();
  };

  useEffect(() => {
    if (isFirstTime) {
      (async () => {
        const resp = await getListofUsers(currentPage, state, query);
        setPages(resp.length);
        setListOfUsers(resp.Info[0].data);
      })();
      setIsFirstTime(false);
    }
    const timeOutId = setTimeout(() => onSearchChange(query), 1500);
    return () => clearTimeout(timeOutId);
  }, [query, state]);

  const handleDeleteCLick = (userId) => {
    const { username } = listOfUsers.filter((user) => user.id === userId)[0];
    setUserToDelete({
      id: userId,
      username,
    });
    setOpenDeleteUser(true);
  };
  const handleBlockClick = (userId) => {
    (async () => {
      let response = '';
      if (state === 'Banned') response = await unBlockUser(userId);
      else response = await blockUser(userId);
      console.log(response);
    })();
    let usersData = [...listOfUsers];
    usersData = usersData.filter((user) => user.id !== userId);
    setListOfUsers(usersData);
    if (!usersData.length) {
      (async () => {
        const resp = await getListofUsers(currentPage, state, query);
        setPages(resp.length);
        setListOfUsers(resp.Info[0].data);
      })();
    }
  };
  const changePage = (e, value) => {
    setCurrentPage(value);
    (async () => {
      const resp = await getListofUsers(value, state, query);
      setPages(resp.length);
      setListOfUsers(resp.Info[0].data);
    })();
  };

  const handleClosePopup = () => {
    setOpenDeleteUser(false);
    document.getElementsByTagName('body')[0].style.setProperty('overflow-y', 'scroll');
  };

  const handleDeleteUser = (userId) => {
    (async () => {
      const resp = await deleteUser(userId);
      console.log(resp);
    })();
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
      <SearchBar placeHolder="Search by username" searchValue={setQuery} />
      {(listOfUsers.length) ? (
        <UsersFeed
          data={listOfUsers}
          buttonStyle="tweetblockbutton"
          buttonStyleClicked="tweetunblockbutton"
          onButtonClick={handleBlockClick}
          onProfileClick={handleDeleteCLick}
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
