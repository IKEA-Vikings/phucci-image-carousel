import React from 'react';
import Image from './image/Image.jsx';

const AnimateCarousel = ({visibility, image}) => (
  <div style={visibility} className='animate-carousel' >
    <div className="carousel-images-container" >
      <div className='images-row-carousel'>
        <Image url={image} slide={true} carousel={true}/>
      </div>
    </div>
  </div>

);

export default AnimateCarousel;