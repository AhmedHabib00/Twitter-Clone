import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import BlockSharpIcon from '@mui/icons-material/BlockSharp';
import { Menu, MenuList } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import VolumeOffOutlinedIcon from '@mui/icons-material/VolumeOffOutlined';
import VerifiedIcon from '@mui/icons-material/Verified';
import styles from './Post.module.css';

function PostHeader({ displayname, username }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const handelOpenMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handelCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <div className={styles.postheader}>
      <div className={styles.postheadertext}>
        <h3>
          <div className={styles.postavatar}>
            <AccountCircleIcon />
            {displayname}
            {' '}
            <span className={styles.postheaderSpecial}>
              {true && <VerifiedIcon className={styles.postbadge} />}
              {' '}
              @
              {username}
            </span>
            <MoreHorizIcon aria-controls="menu" onClick={handelOpenMenu} className={`${styles.postblue} ${styles.posthoricon}`} />
            <Menu data-testid="menu-render-test" className={styles.dropdown} id="menu" onClose={handelCloseMenu} anchorEl={anchorEl} open={Boolean(anchorEl)}>
              <MenuList className={styles['dropdown-content']}>
                <div className={styles['label-out']}>
                  {'    '}
                  <VolumeOffOutlinedIcon className={styles['dropdown-content']} />
                  <p className={styles.label}>
                    {' '}
                    Mute @
                    {displayname}
                  </p>
                </div>
              </MenuList>
              <MenuList className={styles['dropdown-content']}>
                <div className={styles['label-out']}>
                  {'    '}
                  <BlockSharpIcon className={styles['dropdown-content']} />
                  <p className={styles.label}>
                    {' '}
                    Block @
                    {displayname}
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
  displayname: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,

};
export default PostHeader;
