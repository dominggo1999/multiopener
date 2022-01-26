window.addEventListener('load', () => {
  const app = document.querySelector('iframe.injected');

  const keyBindings = (e) => {
    const key = e.key;

    if(key === ',' && e.ctrlKey) {
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

  window.addEventListener('keydown', keyBindings);
});
