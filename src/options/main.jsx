import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import GlobalStyles from '../styles/GlobalStyles';
import Options from './Options';
import ListProvider from '../context/List.context';
import ThemeProvider from '../theme/ThemeProvider';

ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider>
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
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById('root-options'),
);
