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

const modules = [
  {
    element: 'script',
    src: '/dist/assets/inject.js',
  },
  {
    element: 'link',
    src: '/dist/assets/vendor.js',
  },
  {
    element: 'link',
    src: '/dist/assets/GlobalStyles.js',
  },
];

const injectModules = (list) => {
  list.forEach((m) => {
    const element = document.createElement(m.element);

    if(m.element === 'script') {
      element.type = 'module';
      element.crossorigin = true;
      element.src = chrome.runtime.getURL(m.src);
    }

    if(m.element === 'link') {
      element.rel = 'modulepreload';
      element.href = chrome.runtime.getURL(m.src);
    }

    document.querySelector('head').appendChild(element);
  });
};

document.onreadystatechange = () => {
  if (document.readyState === 'interactive') {
    const app = document.createElement('div');
    app.id = 'root-inject';

    document.body.appendChild(app);

    injectModules(modules);
  }
};
