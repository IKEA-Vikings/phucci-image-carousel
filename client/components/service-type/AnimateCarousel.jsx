import Image from './image/Image.jsx';
import React, { useState, useImperativeHandle, useRef } from 'react';

const AnimatedCarousel = React.forwardRef((props, ref) => {
  const [clickedImage, setImage] = useState('');
  const [width, setWidth] = useState(0);
  const [visibility, setAnimation] = useState('hidden');
  const [targetDimension, setDimension] = useState({ width: 0, height: 0 });
  const animationRef = useRef(null);

  useImperativeHandle(ref, () => ({
    animateCarousel,
    isAnimating,
    setClickedImage,
    setTargetDimension
  }));

  const isAnimating = () => visibility === 'visible';
  const getDimension = () => animationRef.current.getBoundingClientRect();
  const setClickedImage = (clickedImageg) => setImage(clickedImageg);
  const setTargetDimension = (target) => setDimension({ width: target.width, heigth: target.height });


  const stopAnimation = (interval, action) => {
    clearInterval(interval);
    setAnimation('hidden');
  };

  const animateCarousel = (action, clickedId, next) => {
    const frameRate = 1.5, velocity = 1;
    setAnimation('visible');

    if (action === 'open') {
      const interval = setInterval(() => {
        const dimension = getDimension();
        if (dimension.width >= targetDimension.width) {
          stopAnimation(interval);
          return next();
        }
        setWidth((currWidth) => currWidth + velocity);
      }, frameRate);
    }
    if (action === 'close') {
      const interval = setInterval(() => {
        const dimension = getDimension();
        if (dimension.width <= 0) { return stopAnimation(interval); }
        setWidth((currWidth) => currWidth - velocity);
      }, frameRate);
    }
  };

  const animateState = {
    position: 'absolute',
    visibility: visibility,
    width: `${width}vw`,
    height: `${width}vh`,
    zIndex: 1000,
    background: 'rgb(255, 255, 255)',
  };

  return (
    <div style={animateState} ref={animationRef} className='animate-carousel' >
      <div className="carousel-images-container" >
        <div className='images-row-carousel'>
          <Image url={clickedImage} slide={true} carousel={true}/>
        </div>
      </div>
    </div>
  );
});

export default AnimatedCarousel;
