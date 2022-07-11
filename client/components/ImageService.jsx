import React, { useState, useEffect, useRef } from 'react';
import ImagesTable from './service-type/ImagesTable.jsx';
import ImagesSlider from './service-type/ImagesSlider.jsx';
import ImagesCarousel from './service-type/ImagesCarousel.jsx';
import AnimatedCarousel from './service-type/AnimateCarousel.jsx';

const ImageService = () => {
  const [images, setImages] = useState([]);
  const [isMobileView, setMobileView] = useState(false);
  const animation = useRef(), carousel = useRef();

  useEffect(() => {
    const fetchImages = () => {
      const productId = window.location.href.split('/')[3] || 1;
      fetch(`images/org/${productId}`)
        .then((images) => images.json())
        .then((fetchedImages) => setImages(fetchedImages))
    };

    window.addEventListener('resize', handleWindowResize);
    isMobileOffset() ? setMobileView(true) : setMobileView(false);
    setAnimatedCarouselDimension();
    fetchImages();
  }, []);

  const isMobileOffset = () =>
    window.innerWidth / window.innerHeight < 1.2;

  const isClickAllow = () =>
    !animation.current.isAnimating() && !carousel.current.isVisible();

  const handleWindowResize = () => isMobileOffset()
    ? setMobileView(true) : setMobileView(false);

  const setAnimatedCarouselDimension = () => {
    const targetDimension = carousel.current.getDimension();
    animation.current.setTargetDimension(targetDimension);
  }

  const handleClick = (id) => {
    if (isClickAllow()) {
      animation.current.setClickedImage(images[id]);
      animation.current.animateCarousel('open', id, () => {
        carousel.current.toggleCarousel();
      });
    }
  };

  const closeCarousel = () => {
    if (carousel.current.isVisible()) {
      carousel.current.toggleCarousel();
      animation.current.animateCarousel('close');
    }
  };

  return (
    <div onClick={closeCarousel}>
      <AnimatedCarousel ref={animation}/>
      <ImagesCarousel ref={carousel} images={images}/>
      {isMobileView
        ? <ImagesSlider images={images} />
        : <ImagesTable images={images} handleClick={handleClick} />}
    </div>
  );
}

export default ImageService;

