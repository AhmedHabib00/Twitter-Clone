import React from 'react';
import { IoMdArrowBack } from 'react-icons/io';
import { MdPostAdd } from 'react-icons/md';
import { FiMoreHorizontal } from 'react-icons/fi';

import './Lists.css';

function Lists() {
  return (
    <div className="lists">
      <IoMdArrowBack className="back-icon" />
      <text className="lists-text">Lists</text>
      <MdPostAdd className="newlist-icon" />
      <FiMoreHorizontal className="more-icon" />
      <h1 className="pinnedlists-text">Pinned Lists</h1>
      <p className="noPinned-text">Nothing to see here yet — pin your favorite Lists to access them quickly.</p>
    </div>
  );
}
export default Lists;
