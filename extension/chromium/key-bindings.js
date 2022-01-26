window.addEventListener('load', () => {
  const app = document.querySelector('iframe.injected');

  const keyBindings = (e) => {
    const key = e.key;

    if((key === ',' && e.ctrlKey) || key === 'Escape') {
      app.style.display = app.style.display === 'block' ? 'none' : 'block';
    }
  };

  window.addEventListener('keydown', keyBindings);
});
