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
    this.setState({ clickedImg: id });
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

