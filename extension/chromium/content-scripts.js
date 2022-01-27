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

const deleteFrame = () => {
  const app = document.querySelector('iframe.injected');
  app?.remove();
};

const createFrame = () => {
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
};

const initContentScript = () => {
  document.onreadystatechange = () => {
    if (document.readyState === 'interactive') {
      // Avoid recursive frame insertion...
      const extensionOrigin = `chrome-extension://${chrome.runtime.id}`;
      // eslint-disable-next-line no-restricted-globals
      if (!location.ancestorOrigins.contains(extensionOrigin)) {
        deleteFrame();
        createFrame();
      }
    }
  };

  if(document.readyState === 'complete') {
    deleteFrame();
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

// Clean up content script
const contentScriptDestructionEvent = `destructContentScripts_${chrome.runtime.id}`;

function destructor() {
  // Destruction is needed only once
  document.removeEventListener(contentScriptDestructionEvent, destructor);
  // Tear down content script: Unbind events, clear timers, restore DOM, etc.
  deleteFrame();
}

// Unload previous content script if needed
document.dispatchEvent(new CustomEvent(contentScriptDestructionEvent));
document.addEventListener(contentScriptDestructionEvent, destructor);

initContentScript();
