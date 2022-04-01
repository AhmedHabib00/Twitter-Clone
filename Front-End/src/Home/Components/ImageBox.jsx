import React from 'react';
import PropTypes from 'prop-types';

import styles from './ImageBox.module.css';
/**
 * component that previews images in a resizable component.
 * it a close button for each image
 * @param {Array} images URL of images to preview
 * @param {Function} onDeleteImage takes an id as an input for the parent component
 * to has remove image of repective id
 */
function ImageBox({ images, onDeleteImage }) {
  let imageWidth = 100;
  if (images.length > 1) {
    imageWidth = 46;
  }
  return (
    <div data-testid="image" className={styles.imagebox}>
      {images.map((image) => (
        <div
          id="image-box-image-canvas"
          className={styles.image}
          key={image.id}
          style={{
            backgroundImage: `url(${image.imageUrl})`,
            paddingBottom: `${imageWidth}%`,
            width: `${imageWidth}%`,
          }}
        >
          <div id="image-box-delete-button" className={styles['delete-image']} role="button" tabIndex={0} onClick={() => onDeleteImage(image.id)}>X</div>

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
