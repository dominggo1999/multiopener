/* eslint-disable import/extensions */

const extensionStorage = chrome.storage.local || browser.storage.local;
const runtime = chrome ? chrome.runtime : browser.runtime;

const getValueInStore = (key) => {
  return new Promise((resolve, reject) => {
    extensionStorage.get([key], (result) => {
      resolve(result);
    });
  });
};

const setValueInStore = async (values, callback = () => {}) => {
  await extensionStorage.set(values);

  callback();
};
