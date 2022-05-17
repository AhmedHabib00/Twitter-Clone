import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import BlockSharpIcon from '@mui/icons-material/BlockSharp';
import { Menu, MenuList } from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';
import RepeatIcon from '@mui/icons-material/Repeat';
import { useNavigate } from 'react-router';
import styles from './Post.module.css';
import { blockUser } from '../../Services/postServices';

function PostHeader({
  id, displayName, userName, url, whoRetweeted,
}) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const handelOpenMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handelCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleBlockUser = () => {
    if (localStorage.userId === id) {
      (async () => {
        await blockUser(id).then(
          navigate('/'),
        );
      })();
    }
  };
  return (
    <div className={styles.postheader}>
      {(whoRetweeted === '') ? '' : (
        <div className={styles['who-retweeted-container']}>
          <RepeatIcon fontSize="very small" className={styles['who-retweeted-icon']} />
          <b className={styles['who-retweeted']}>
            {whoRetweeted}
            {' '}
            Retweeted
          </b>
        </div>
      )}
      <div className={styles.postheadertext}>
        <h3>
          <div data-testid="post-avatar-render-test" className={styles.postavatar}>
            <img
              className={styles['profile-img']}
              alt=""
              src={url}
            />
            {displayName}
            {' '}
            <span className={styles.postheaderSpecial}>
              {true && <VerifiedIcon className={styles.postbadge} />}
              {' '}
              @
              {userName}
            </span>
            <MoreHorizIcon aria-controls="menu" onClick={handelOpenMenu} className={`${styles.postblue} ${styles.posthoricon}`} />
            <Menu data-testid="menu-render-test" className={styles.dropdown} id="menu" onClose={handelCloseMenu} anchorEl={anchorEl} open={Boolean(anchorEl)}>
              <MenuList className={styles['dropdown-content']}>
                <div
                  className={styles['label-out']}
                  role="button"
                  tabIndex={0}
                  onClick={handleBlockUser}
                >
                  {'    '}
                  <BlockSharpIcon className={styles['dropdown-content']} />
                  <p className={styles.label}>
                    {' '}
                    Block @
                    {displayName}
                  </p>
                </div>
              </MenuList>
            </Menu>

          </div>
        </h3>
      </div>
    </div>
  );
}

PostHeader.propTypes = {
  id: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  whoRetweeted: PropTypes.string,
};

PostHeader.defaultProps = {
  whoRetweeted: '',
};

export default PostHeader;
