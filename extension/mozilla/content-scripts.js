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
