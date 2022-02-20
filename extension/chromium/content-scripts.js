/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
/* eslint-disable array-callback-return */

(() => {
  const getValueInStore = (key) => {
    const extensionStorage = chrome ? chrome.storage.local : browser.storage.local;

    return new Promise((resolve, reject) => {
      extensionStorage.get([key], (result) => {
        resolve(result);
      });
    });
  };

  const deleteFrame = () => {
    const app = document.querySelector('iframe.injected');
    app?.remove();
  };

  const createFrame = () => {
    const iframe = document.createElement('iframe');
    // Must be declared at web_accessible_resources in manifest.json
    iframe.src = chrome.runtime.getURL('/dist/inject/index.html');
    iframe.frameborder = '0';

    if(iframe.style) {
      iframe.style.cssText = 'position:fixed;top:0;left:0;display:block;width:100%;min-height:100%;z-index:9999;border:0;z-index:2147483647;';
      iframe.style.display = 'none';
      iframe.style.colorScheme = 'light';

      iframe.classList.add('injected');
      document.body.appendChild(iframe);
    }
  };

  const initContentScript = () => {
    document.addEventListener('DOMContentLoaded', (event) => {
      if (document.readyState === 'interactive') {
        // Avoid recursive frame insertion...
        const extensionOrigin = `chrome-extension://${chrome.runtime.id}`;

        // eslint-disable-next-line no-restricted-globals
        if (!location.ancestorOrigins.contains(extensionOrigin)) {
          createFrame();
        }
      }
    });

    if(document.readyState === 'complete') {
      createFrame();
    }
  };

  chrome.runtime.onMessage.addListener((request) => {
    const { message } = request;

    if(message === 'close frame') {
      const iframe = document.querySelector('iframe.injected');
      iframe.style.display = 'none';
      iframe.blur();
    }
  });

  const messageHandler = (e) => {
    if(!chrome.runtime?.id && e.data === 'close iframe') {
      const app = document.querySelector('iframe.injected');
      app.style.display = 'none';
    }

    // Toggle Frame
    if(e.data === 'update frame') {
      const app = document.querySelector('iframe.injected');
      if(app.style.display === 'block') {
        app.style.display = 'none';
      }else if (app.style.display === 'none') {
        app.style.display = 'block';
        app.focus();
      }
    }

    // Close frame
    if(e.data === 'escape') {
      const app = document.querySelector('iframe.injected');

      app.style.display = 'none';
    }
  };

  // ON Disable
  window.addEventListener('message', messageHandler);

  // Clean up content script
  const contentScriptDestructionEvent = `destructContentScripts_${chrome.runtime.id}`;

  function destructor() {
    // Destruction is needed only once
    document.removeEventListener(contentScriptDestructionEvent, destructor);
    // Tear down content script: Unbind events, clear timers, restore DOM, etc.
    deleteFrame();
    window.removeEventListener('message', messageHandler);
  }

  // Unload previous content script if needed
  document.dispatchEvent(new CustomEvent(contentScriptDestructionEvent));
  document.addEventListener(contentScriptDestructionEvent, destructor);

  initContentScript();
})();
