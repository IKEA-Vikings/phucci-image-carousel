import React from 'react';
import ImagesRow from './ImagesRow.jsx';


const ImagesCarousel = ({images, visibility, style}) => (
  <div style={visibility} className='images-carousel'>
    <div className="carousel-images-container" >
      <ImagesRow images={images} carousel={true} slide={true}/>
    </div>
  </div>
);


export default ImagesCarousel;