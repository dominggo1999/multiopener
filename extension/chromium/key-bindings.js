(() => {
  const keyBindings = (e) => {
    const key = e.key;

    // Toggle Frame
    if(key === ',' && e.ctrlKey && chrome.runtime?.id) {
      window.parent.postMessage('update frame', '*');
    }

    if(key === 'Escape') {
      window.parent.postMessage('escape', '*');
    }
  };

  // Script Functionality
  const initKeyBinding = () => {
    const addKeyBindings = () => {
      window.addEventListener('keydown', keyBindings);
    };

    document.addEventListener('DOMContentLoaded', (event) => {
      if (document.readyState === 'interactive') {
        // Avoid recursive frame insertion...
        const extensionOrigin = `chrome-extension://${chrome.runtime.id}`;

        // eslint-disable-next-line no-restricted-globals
        if (!location.ancestorOrigins.contains(extensionOrigin)) {
          addKeyBindings();
        }
      }
    });

    // If page already loaded but extension is reloaded or updated
    if(document.readyState === 'complete') {
      addKeyBindings();
    }
  };

  // On disable then remove event listener
  const messageHandler = (e) => {
    if(!chrome.runtime.id) {
      window.removeEventListener('keydown', keyBindings);
    }
  };

  window.addEventListener('message', messageHandler);

  // Clean up content script
  const destructionEvent = `destructKeyBindings_${chrome.runtime.id}`;

  function destructor() {
    // Destruction is needed only once
    document.removeEventListener(destructionEvent, destructor);
    // Tear down content script: Unbind events, clear timers, restore DOM, etc.
    window.removeEventListener('keydown', keyBindings);
    window.removeEventListener('message', messageHandler);
  }

  // Unload previous content script if needed
  document.dispatchEvent(new CustomEvent(destructionEvent));
  document.addEventListener(destructionEvent, destructor);

  initKeyBinding();
})();
