import React from 'react';
import ReactDOM from 'react-dom';
import GlobalStyles from '../styles/GlobalStyles';
import SearchBox from './SearchBox';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <SearchBox />
  </React.StrictMode>,
  document.getElementById('root-inject'),
);
