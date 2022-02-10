import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import GlobalStyles from '../styles/GlobalStyles';
import Options from './Options';

ReactDOM.render(
  <React.StrictMode>
    <Router
      baseName="/dist/options"
    >
      <GlobalStyles />
      <Options />
    </Router>
  </React.StrictMode>,
  document.getElementById('root-options'),
);
