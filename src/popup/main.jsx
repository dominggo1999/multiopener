import React from 'react';
import ReactDOM from 'react-dom';
import GlobalStyles from '../styles/GlobalStyles';
import Popup from './Popup';
import ThemeProvider from '../theme/ThemeProvider';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <GlobalStyles />
      <Popup />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
