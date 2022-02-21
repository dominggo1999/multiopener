// // https://stackoverflow.com/questions/1589721/get-selected-text-position-and-place-an-element-next-to-it/1589912#1589912
// (() => {
//   if(document.xmlVersion) return;

//   const createTooltip = () => {
//     const t = document.createElement('div');
//     t.classList.add('tool-tip');
//     t.style.cssText = 'background-color:#A7C0DC;position:absolute;';
//     document.body.appendChild(t);

//     return t;
//   };

//   let tooltip = '';
//   let text = '';
//   let selectionPosition = {};

//   const handleTextSelection = (e) => {
//     const selection = document.getSelection && window.getSelection();
//     if(selection && selection.rangeCount > 0) {
//       text = selection.toString();
//       if(text) {
//         const range = selection.getRangeAt(0); // get the text range
//         const rect = range.getBoundingClientRect();
//         selectionPosition = rect;
//       }
//     }
//   };

//   const handleFinishSelecting = () => {
//     if(text.trim()) {
//       const {
//         width, height, left, top,
//       } = selectionPosition;

//       const scrollTop = window.pageYOffset || document.body.scrollTop;
//       const scrollLeft = window.pageXOffset || document.body.scrollLeft;
//     }
//   };

//   const handleResetSelecting = () => {

//   };

//   const initTooltip = () => {
//     const addSelectionListener = () => {
//       document.addEventListener('selectionchange', handleTextSelection);
//       document.addEventListener('mouseup', handleFinishSelecting);
//       document.addEventListener('mousedown', handleResetSelecting);
//       tooltip = createTooltip();
//     };

//     document.addEventListener('DOMContentLoaded', (event) => {
//       if (document.readyState === 'interactive') {
//         // Avoid recursive frame insertion...
//         const extensionOrigin = `chrome-extension://${chrome.runtime.id}`;

//         // eslint-disable-next-line no-restricted-globals
//         if (!location.ancestorOrigins.contains(extensionOrigin)) {
//           addSelectionListener();
//         }
//       }
//     });

//     // If page already loaded but extension is reloaded or updated
//     if(document.readyState === 'complete') {
//       addSelectionListener();
//     }
//   };

//   // Clean up content script
//   const contentScriptDestructionEvent = `destructTooltip_${chrome.runtime.id}`;

//   function destructor() {
//     // Destruction is needed only once
//     document.removeEventListener(contentScriptDestructionEvent, destructor);
//     // Tear down content script: Unbind events, clear timers, restore DOM, etc.
//     document.removeEventListener('selectionchange', handleTextSelection);
//     document.removeEventListener('mouseup', handleFinishSelecting);
//     document.removeEventListener('mousedown', handleResetSelecting);
//     tooltip?.remove();
//   }

//   // Unload previous content script if needed
//   document.dispatchEvent(new CustomEvent(contentScriptDestructionEvent));
//   document.addEventListener(contentScriptDestructionEvent, destructor);

//   initTooltip();
// })();
