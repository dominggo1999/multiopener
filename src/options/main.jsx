import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import GlobalStyles from '../styles/GlobalStyles';
import Options from './Options';
import ListProvider from './context/List.context';

ReactDOM.render(
  <React.StrictMode>
    <ListProvider>
      <Router
        baseName="/dist/options"
        hashType="noslash"
      >
        <GlobalStyles />
        <Options />
      </Router>
    </ListProvider>
  </React.StrictMode>,
  document.getElementById('root-options'),
);
