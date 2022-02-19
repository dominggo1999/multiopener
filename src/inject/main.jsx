import React from 'react';
import ReactDOM from 'react-dom';
import GlobalStyles from '../styles/GlobalStyles';
import SearchBox from './SearchBox';
import ThemeProvider from '../theme/ThemeProvider';
import ListProvider from '../context/List.context';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <ListProvider>
        <GlobalStyles />
        <SearchBox injected />
      </ListProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root-inject'),
);
