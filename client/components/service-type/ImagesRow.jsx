import React from 'react';
import Image from './image/Image.jsx';


const ImagesRow = ({images, slide, carousel, row, handleClick}) => {
  let className = slide ? 'images-row-slide' : 'images-row-table';
  className = carousel ? 'images-row-carousel' : className;

  return (
    <div className={className} >
      {images.map((image, col) => !slide && !carousel
        ? <Image id={`image-${row + row + col}`} key={col} url={image} slide={slide} handleClick={handleClick} />
        : <Image id={`image-${col}`} key={col} url={image} slide={slide} carousel={carousel}/>
      )}
    </div>
  );
};

export default ImagesRow;