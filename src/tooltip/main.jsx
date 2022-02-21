import React from 'react';
import ReactDOM from 'react-dom';
import Tooltip from './Tooltip';

document.addEventListener('DOMContentLoaded', (event) => {
  if (document.readyState === 'interactive') {
    // Avoid recursive frame insertion...
    const extensionOrigin = `chrome-extension://${chrome.runtime.id}`;

    // eslint-disable-next-line no-restricted-globals
    if (!location.ancestorOrigins.contains(extensionOrigin)) {
      const app = document.createElement('div');
      app.id = 'root-tooltip';
      document.body.appendChild(app);
      ReactDOM.render(<Tooltip />, app);
    }
  }
});
