import React from 'react';
import ReactDOM from 'react-dom';
import GlobalStyles from '../styles/GlobalStyles';
import SearchBox from './SearchBox';
import ThemeProvider from '../theme/ThemeProvider';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <GlobalStyles />
      <SearchBox />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root-inject'),
);
