import React from 'react';
import ReactDOM from 'react-dom';
import GlobalStyles from '../styles/GlobalStyles';
import SearchBox from './SearchBox';
import ThemeProvider from '../theme/ThemeProvider';
import ListProvider from '../context/List.context';

const unmountReact = (e) => {
  if(e.data === 'unmount react') {
    const a = ReactDOM.unmountComponentAtNode(document.getElementById('root-inject'));
    window.removeEventListener('message', unmountReact);
    // eslint-disable-next-line no-restricted-globals
    parent.window.postMessage('removetheiframe', '*');
  }
};
window.addEventListener('message', unmountReact);

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
