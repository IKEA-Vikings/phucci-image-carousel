import React, { useState, useRef, useImperativeHandle } from 'react';
import ImagesRow from './ImagesRow.jsx';

const ImagesCarousel = React.forwardRef(({ images }, ref) => {
  const [carouselView, setView] = useState('hidden');
  const visibility = { visibility: carouselView };
  const carouselRef = useRef();

  useImperativeHandle(ref, () => ({
    getDimension,
    toggleCarousel,
    isVisible
  }));

  const isVisible = () => carouselView === 'visible';

  const toggleCarousel = () => carouselView === 'hidden'
    ? setView('visible')
    : setView('hidden');

  const getDimension = () =>
    carouselRef.current.getBoundingClientRect();

  return (
    <div style={visibility} ref={carouselRef} className='images-carousel'>
      <div className="carousel-images-container" >
        <ImagesRow images={images} carousel={true} slide={true}/>
      </div>
    </div>
  );
});

export default ImagesCarousel;