/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
/* eslint-disable array-callback-return */

const extensionStorage = chrome ? chrome.storage.local : browser.storage.local;
const runtime = chrome ? chrome.runtime : browser.runtime;

const getValueInStore = (key) => {
  return new Promise((resolve, reject) => {
    extensionStorage.get([key], (result) => {
      resolve(result);
    });
  });
};

// const modules = [
//   {
//     element: 'script',
//     src: '/dist/assets/inject.js',
//   },
//   {
//     element: 'link',
//     src: '/dist/assets/vendor.js',
//   },
//   {
//     element: 'link',
//     src: '/dist/assets/GlobalStyles.js',
//   },
// ];

// const injectModules = (list) => {
//   list.forEach((m) => {
//     const element = document.createElement(m.element);

//     if(m.element === 'script') {
//       element.type = 'module';
//       element.crossorigin = true;
//       element.src = chrome.runtime.getURL(m.src);
//     }

//     if(m.element === 'link') {
//       element.rel = 'modulepreload';
//       element.href = chrome.runtime.getURL(m.src);
//     }

//     document.querySelector('head').appendChild(element);
//   });
// };

// document.onreadystatechange = () => {
//   if (document.readyState === 'interactive') {
//     const app = document.createElement('div');
//     app.id = 'root-inject';
//     app.style.display = 'none';

//     document.body.appendChild(app);

//     injectModules(modules);
//   }
// };

document.onreadystatechange = () => {
  if (document.readyState === 'interactive') {
    // Avoid recursive frame insertion...
    const extensionOrigin = `chrome-extension://${chrome.runtime.id}`;
    // eslint-disable-next-line no-restricted-globals
    if (!location.ancestorOrigins.contains(extensionOrigin)) {
      const iframe = document.createElement('iframe');
      // Must be declared at web_accessible_resources in manifest.json
      iframe.src = chrome.runtime.getURL('/dist/inject/index.html');
      iframe.style.cssText = 'position:fixed;top:0;left:0;display:block;width:100%;min-height:100%;z-index:9999;border:0;';
      iframe.ALLOWTRANSPARENCY = 'true';
      iframe.style.display = 'none';
      iframe.frameborder = '0';

      iframe.classList.add('injected');
      // Some styles for a fancy sidebar

      document.body.appendChild(iframe);
    }
  }
};

chrome.runtime.onMessage.addListener((request) => {
  const { message } = request;

  if(message === 'close frame') {
    const iframe = document.querySelector('iframe.injected');

    iframe.blur();
  }
});
