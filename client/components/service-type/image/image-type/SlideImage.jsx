import React from 'react';

const SlideImage = ({url, id, carousel}) => {
  return (
    <img className={carousel ? 'product-image-carousel' : 'product-image-slide'} id={id} src={url}/>
  );
};

export default SlideImage;