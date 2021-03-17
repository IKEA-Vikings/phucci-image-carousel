import React from 'react';
import ImagesRow from './ImagesRow.jsx';


const ImagesSlider = ({images}) => {

  return (
    <div className="images-slider">
      <ImagesRow images={images} slide={true}/>
    </div>
  );
};

export default ImagesSlider;