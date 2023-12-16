import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'; // Import the Router component

import App from './App';

ReactDOM.render(
  // eslint-disable-next-line
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
