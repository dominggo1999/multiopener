import { links } from './inject/temp-data';

// const runtime = chrome ? chrome.runtime : browser.runtime;
// const browserTabs = chrome ? chrome.tabs : browser.tabs;
// const extensionStorage = chrome ? chrome.storage.local : browser.storage.local;

// export const isExtension = chrome.storage || browser.storage;

// export const getValueInStore = (key) => {
//   return new Promise((resolve, reject) => {
//     extensionStorage.get([key], (result) => {
//       resolve(result);
//     });
//   });
// };

// export const messageToBackground = async (message) => {
//   await runtime?.sendMessage(message);
// };

// export const messageToContentScript = async (message) => {
//   await browserTabs?.query({}, (tabs) => {
//     tabs?.forEach((tab) => {
//       browserTabs.sendMessage(tab.id, message);
//     });
//   });
// };

export const createURL = (query, baseURL) => {
  return baseURL.replace('iamlazy', query);
};

export const getLinksInGroup = (groupID) => {
  return links.filter((i) => i.group === groupID);
};
