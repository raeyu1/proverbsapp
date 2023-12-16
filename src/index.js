import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'; // Import the Router component

import App from './App';

ReactDOM.render(
  <Router basename="/proverbsapp"> {/* Set the basename */}
    <App />
  </Router>,
  document.getElementById('root')
);
