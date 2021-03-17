import React from 'react';
import ReactDOM from 'react-dom';
import ImageService from './components/ImageService.jsx';



class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Ikea</h1>
        <ImageService />
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
