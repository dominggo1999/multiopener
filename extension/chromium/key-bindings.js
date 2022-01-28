(() => {
  const keyBindings = (e) => {
    const app = document.querySelector('iframe.injected');
    const key = e.key;

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

    // When page First Loaded
    window.addEventListener('load', () => {
      addKeyBindings();
    });

    // If page already loaded but extension is reloaded or updated
    if(document.readyState === 'complete') {
      addKeyBindings();
    }
  };

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
