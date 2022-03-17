import React from 'react';
import PropTypes from 'prop-types';

import './ImageBox.css';

// eslint-disable-next-line no-unused-vars
function ImageBox({ images, onDeleteImage }) {
  let imageWidth = 100;
  if (images.length > 1) {
    imageWidth = 46;
  }
  return (
    <div className="imagebox">
      {images.map((image) => (
        <div
          className="image"
          key={image.id}
          style={{
            backgroundImage: `url(${image.imageUrl})`,
            paddingBottom: `${imageWidth}%`,
            width: `${imageWidth}%`,
          }}
        >
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
          <div className="delete-image" role="button" tabIndex={0} onClick={() => onDeleteImage(image.id)}>X</div>

        </div>
      ))}
    </div>
  );
}

ImageBox.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
  })).isRequired,
  onDeleteImage: PropTypes.func.isRequired,
};
export default ImageBox;
