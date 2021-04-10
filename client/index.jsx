import React from 'react';
import ReactDOM from 'react-dom';
import ImageService from './components/ImageService.jsx';
import './../public/style.css';


class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <ImageService />
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('image-service'));
