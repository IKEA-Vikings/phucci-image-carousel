import React from 'react';

const TableImage = ({url, id, handleClick}) => {

  return (
    <a
      href={`#${id}`}
      onClick={() => handleClick(id.split('-')[1])}
      className='product-image-container-table'>
      <img className='product-image-table' src={url}/>
    </a>
  );
};

export default TableImage;