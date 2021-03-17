import React from 'react';
import TableImage from './image-type/TableImage.jsx';
import SlideImage from './image-type/SlideImage.jsx';


const Image = ({url, slide, carousel, id, handleClick}) => {
  return slide ?
    <SlideImage url={url} id={id} carousel={carousel} /> :
    <TableImage url={url} id={id} handleClick={handleClick} />;
};

export default Image;