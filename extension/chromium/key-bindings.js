const keyBindings = (e) => {
  const app = document.querySelector('iframe.injected');
  const key = e.key;

  if(key === ',' && e.ctrlKey && chrome.runtime?.id) {
    if(app.style.display === 'block') {
      app.style.display = 'none';
    }else if (app.style.display === 'none') {
      app.style.display = 'block';
      app.focus();
    }
  }

  if(key === 'Escape') {
    app.style.display = 'none';
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

// Clean up content script
const destructionEvent = `destructKeyBindings_${chrome.runtime.id}`;

function destructor() {
  // Destruction is needed only once
  document.removeEventListener(destructionEvent, destructor);
  // Tear down content script: Unbind events, clear timers, restore DOM, etc.
  window.removeEventListener('keydown', keyBindings);
}

// Unload previous content script if needed
document.dispatchEvent(new CustomEvent(destructionEvent));
document.addEventListener(destructionEvent, destructor);

initKeyBinding();

window.addEventListener('message', (e) => {
  if(!chrome.runtime.id) {
    window.removeEventListener('keydown', keyBindings);
  }
});
