import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import GlobalStyles from '../styles/GlobalStyles';
import Options from './Options';
import ListProvider from './context/List.context';
import ThemeProvider from '../theme/ThemeProvider';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <ListProvider>
        <Router
          baseName="/dist/options"
          hashType="noslash"
        >
          <GlobalStyles />
          <Options />
        </Router>
      </ListProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root-options'),
);
