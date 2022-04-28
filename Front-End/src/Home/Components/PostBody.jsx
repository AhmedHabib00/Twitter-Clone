import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import PropTypes from 'prop-types';
import ImagePopUp from './ImagePopUp';
import styles from './Post.module.css';

function PostBody({
  id, content, img1, img2, img3, img4,
}) {
  const navigate = useNavigate();
  const [imagePopUp, setImagePopUp] = useState(false);
  return (
    <div>
      <div data-testid="content-render-test" className={styles.postheaderdescription} role="button" tabIndex={0} onClick={() => navigate(`/tweet/${id}`)}>
        <p>{content}</p>
      </div>
      <div data-testid="images-render-test">
        <a href="# " onClick={() => setImagePopUp(!imagePopUp)}><img src={img1} alt="pic1" /></a>
        <a href="# " onClick={() => setImagePopUp(!imagePopUp)}><img src={img2} alt="pic1" /></a>
        <a href="# " onClick={() => setImagePopUp(!imagePopUp)}><img src={img3} alt="pic1" /></a>
        <a href="# " onClick={() => setImagePopUp(!imagePopUp)}><img src={img4} alt="pic1" /></a>
      </div>
      <div>
        {imagePopUp
              && document.getElementsByTagName('body')[0].style.setProperty('overflow-y', 'hidden')}
        <ImagePopUp name="body" trigger={imagePopUp} setTrigger={setImagePopUp}>
          <Carousel>

            <div>
              <img className={styles.imgpopup} src={img1} alt="pic1" />
            </div>

            <div>
              <img className={styles.imgpopup} src={img2} alt="pic2" />
            </div>

            <div>
              <img className={styles.imgpopup} src={img3} alt="pic3" />
            </div>

            <div>
              <img className={styles.imgpopup} src={img4} alt="pic4" />
            </div>

          </Carousel>
        </ImagePopUp>
      </div>
    </div>
  );
}

PostBody.propTypes = {
  id: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
  img1: PropTypes.string.isRequired,
  img2: PropTypes.string.isRequired,
  img3: PropTypes.string.isRequired,
  img4: PropTypes.string.isRequired,

};
export default PostBody;
