import React from 'react';
import ReactDOM from 'react-dom';
import Tooltip from './Tooltip';

(() => {
  const app = document.createElement('div');
  app.id = 'root-tooltip';

  const injectTooltip = () => {
    document.body.appendChild(app);
    ReactDOM.render(<Tooltip />, app);
  };

  const initTooltip = () => {
    document.addEventListener('DOMContentLoaded', (event) => {
      if (document.readyState === 'interactive') {
        // Avoid recursive frame insertion...
        const extensionOrigin = `chrome-extension://${chrome.runtime.id}`;

        // eslint-disable-next-line no-restricted-globals
        if (!location.ancestorOrigins.contains(extensionOrigin)) {
          injectTooltip();
        }
      }
    });

    if(document.readyState === 'complete') {
      injectTooltip();
    }
  };

  const unmountReact = (e) => {
    const a = ReactDOM.unmountComponentAtNode(app);

    if(a) {
      app.remove();
    }
  };

  const removeTooltip = (e) => {
    if(e.data === 'remove tooltip') {
      unmountReact();
      window.removeEventListener('message', removeTooltip);
    }
  };

  window.addEventListener('message', removeTooltip);

  // Clean up content script
  const destructionEvent = `desctuctTooltip_${chrome.runtime.id}`;

  function destructor() {
    // Destruction is needed only once
    document.removeEventListener(destructionEvent, destructor);
    // Tear down content script: Unbind events, clear timers, restore DOM, etc.
    unmountReact();
  }

  // Unload previous content script if needed
  document.dispatchEvent(new CustomEvent(destructionEvent));
  document.addEventListener(destructionEvent, destructor);

  initTooltip();
})();
