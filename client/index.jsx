import React from 'react';
import ReactDOM from 'react-dom';
import ImageService from './components/ImageService.jsx';
import './../public/style.css';

const App = () => {
  return (
    <div>
      <ImageService />
    </div>
  );
}

ReactDOM.render(<App/>, document.getElementById('image-service'));
