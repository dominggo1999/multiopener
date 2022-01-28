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

const browserTabs = chrome.tabs;

const sendMessage = async (message) => {
  await browserTabs?.query({}, (tabs) => {
    tabs?.forEach((tab) => {
      browserTabs.sendMessage(tab.id, message);
    });
  });
};

const startExtension = async () => {
  const contentScripts = chrome.runtime.getManifest().content_scripts;

  for (let i = 0; i < contentScripts.length; i += 1) {
    const contScript = contentScripts[i];
    chrome.tabs.query({ url: contScript.matches }, (foundTabs) => {
      for (let j = 0; j < foundTabs.length; j += 1) {
        const javaScripts = contScript.js;

        const allFrames = javaScripts[0] === 'key-bindings.js';

        chrome.scripting.executeScript(
          {
            target: {
              tabId: foundTabs[j].id,
              allFrames,
            },
            files: javaScripts,
          },
        );
      }
    });
  }
};

chrome.runtime.onInstalled.addListener(startExtension);
chrome.management.onEnabled.addListener(startExtension);
