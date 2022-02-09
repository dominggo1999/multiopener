import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import GlobalStyles from '../styles/GlobalStyles';
import Options from './Options';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <GlobalStyles />
      <Options />
    </Router>
  </React.StrictMode>,
  document.getElementById('root-options'),
);
