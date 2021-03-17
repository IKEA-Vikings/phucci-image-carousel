import React from 'react';
import ReactDOM from 'react-dom';
import request from './../lib/request.js';
import ImagesTable from './service-type/ImagesTable.jsx';
import ImagesSlider from './service-type/ImagesSlider.jsx';
import $ from 'jquery';



class ImageService extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      images: [],
      mobileView: false,
      carouselVisibility: 'hidden',

      clickedImg: null,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    request.getOrgImages(0, (images) => this.setState({ images: images }));
    window.addEventListener('resize', this.handleResize.bind(this));
    this.isMobileOffset() ? this.setState({ mobileView: true }) : null;

  }

  handleClick(id) {
    if (this.isCarouselOn()) { return this.closeCarousel(); }
    this.setState({ clickedImg: id });
    this.toggleCarousel();
  }


  closeCarousel() {
    if (this.isCarouselOn()) {
      this.setState({ carouselVisibility: 'hidden' });
    }
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
    return (
      <div >
        <ImagesCarousel visibility={carouselVisibility} images={this.state.images}/>
        <div>
          {this.state.mobileView ?
            <ImagesSlider images={this.state.images} /> :
            <ImagesTable images={this.state.images} handleClick={this.handleClick} />}
        </div>
      </div>
    );
  }
}

export default ImageService;

