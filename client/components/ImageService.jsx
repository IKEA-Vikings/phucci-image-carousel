import React from 'react';
import ReactDOM from 'react-dom';
import request from './../lib/request.js';
import ImagesTable from './service-type/ImagesTable.jsx';
import ImagesSlider from './service-type/ImagesSlider.jsx';
import ImagesCarousel from './service-type/ImagesCarousel.jsx';
import AnimateCarousel from './service-type/AnimateCarousel.jsx';
import $ from 'jquery';



class ImageService extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      images: [],
      mobileView: false,
      carouselVisibility: 'hidden',

      carouselWidth: 0,
      carouselHeight: 0,

      animateVisibility: 'hidden',
      animateWidth: 0,
      animateHeight: 0,

      clickedImg: null,
      inAnimation: false
    };

    this.handleClick = this.handleClick.bind(this);
    this.closeCarousel = this.closeCarousel.bind(this);
  }

  componentDidMount() {
    request.getOrgImages((images) => this.setState({ images: images }));
    window.addEventListener('resize', this.handleResize.bind(this));
    this.isMobileOffset() ? this.setState({ mobileView: true }) : null;
  }

  handleClick(id) {

    if (!this.state.inAnimation) {
      if (this.isCarouselOn()) { return this.closeCarousel(); }

      let carousel = $('.images-carousel')[0].getBoundingClientRect();

      this.setState({
        clickedImg: id,
        carouselWidth: carousel.width,
        carouselHeight: carousel.height
      });

      this.animateCarousel('open', (interval) => {
        clearInterval(interval);
        this.setState({
          animateVisibility: 'hidden',
          inAnimation: false
        });
        this.toggleCarousel();
      });

    }
  }

  animateCarousel(action, cb) {
    this.setState({
      animateVisibility: 'visible',
      inAnimation: true
    });

    let frameRate = 4.7;
    let velocity = 0.5;
    let carousel = $('.animate-carousel')[0];

    if (action === 'open') {
      let interval = setInterval(() => {
        let carouselPos = carousel.getBoundingClientRect();
        if (carouselPos.width >= this.state.carouselWidth && carouselPos.height >= this.state.carouselHeight) { cb(interval); }

        if (carouselPos.width < this.state.carouselWidth) {
          this.setState({ animateWidth: this.state.animateWidth += velocity });
        }
      }, frameRate);

    } else if (action === 'close') {
      let interval = setInterval(() => {
        let carouselPos = carousel.getBoundingClientRect();
        if (carouselPos.width <= 0 && carouselPos.height <= 0) { cb(interval); }

        if (carouselPos.width > 0) {
          this.setState({ animateWidth: this.state.animateWidth -= velocity });
        }
      }, frameRate);
    }

  }

  closeCarousel(e) {
    if (this.isCarouselOn() && this.isOutsideCarousel(e)) {

      this.setState({ carouselVisibility: 'hidden' });

      this.animateCarousel('close', (interval) => {
        clearInterval(interval);
        this.setState({
          animateVisibility: 'hidden',
          inAnimation: false
        });
      });
    }
  }

  isOutsideCarousel(e) {
    return e.target.className !== 'carousel-images-container';
  }

  toggleCarousel() {
    this.state.carouselVisibility === 'visible' ?
      this.setState({ carouselVisibility: 'hidden' }) :
      this.setState({ carouselVisibility: 'visible' });
  }

  isCarouselOn() {
    return this.state.carouselVisibility === 'visible';
  }

  handleResize() {
    this.isMobileOffset() ?
      this.setState({ mobileView: true }) :
      this.setState({ mobileView: false });
  }


  isMobileOffset() {
    return window.innerWidth / window.innerHeight < 1.2;
  }

  render() {
    let carouselVisibility = { visibility: this.state.carouselVisibility };

    let animateState = {
      position: 'absolute',
      visibility: this.state.animateVisibility,
      width: `${this.state.animateWidth}vw`,
      height: `${this.state.animateWidth}vh`,
      zIndex: 1000,
      background: 'rgb(255, 255, 255)',
    };


    return (
      <div onClick={(e) => this.closeCarousel(e)}>
        <AnimateCarousel visibility={animateState} image={this.state.images[this.state.clickedImg]}/>
        <ImagesCarousel visibility={carouselVisibility} images={this.state.images}/>
        {this.state.mobileView ?
          <ImagesSlider images={this.state.images} /> :
          <ImagesTable images={this.state.images} handleClick={this.handleClick} />}
      </div>
    );
  }
}

export default ImageService;

