import React from 'react';
import ImagesRow from './ImagesRow.jsx';


const ImagesTable = ({images, handleClick}) => {

  return (
    <div className="images-table">
      <ImagesRow row={0} images={images.slice(0, 2)} handleClick={handleClick} />
      <ImagesRow row={1} images={images.slice(2)} handleClick={handleClick} />
    </div>

  );
};

export default ImagesTable;