import React, { useState } from 'react';
import { Carousel } from 'bootstrap';

function Trial() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://media.istockphoto.com/photos/make-decision-which-way-to-go-walking-on-directional-sign-on-asphalt-picture-id1138420319"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://media.istockphoto.com/photos/make-decision-which-way-to-go-walking-on-directional-sign-on-asphalt-picture-id1138420319"
          alt="Second slide"
        />

      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://media.istockphoto.com/photos/make-decision-which-way-to-go-walking-on-directional-sign-on-asphalt-picture-id1138420319"
          alt="Third slide"
        />

      </Carousel.Item>
    </Carousel>

  );
}

export default Trial;
