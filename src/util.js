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

const queryText = /iamlazy/ig;
export const createURL = (query, baseURL) => {
  return baseURL.replace(queryText, query);
};

export const createTestURL = (baseURL) => {
  return createURL('test', baseURL);
};

export const getDomainAndSubDomain = (link) => {
  const domainValidator = /^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i;

  return domainValidator.exec(link)[1];
};

export const storageGet = async (key) => {
  if(chrome?.storage?.local) {
    const getValueInStore = (key) => {
      return new Promise((resolve, reject) => {
        chrome.storage.local.get([key], (result) => {
          resolve(result);
        });
      });
    };

    const result = await getValueInStore(key);

    return result[key];
  }

  const result = JSON.parse(localStorage.getItem(key));

  return result;
};

export const storageSet = async (key, value) => {
  if(chrome?.storage?.local) {
    const setValueInStore = async (values, callback = () => {}) => {
      await chrome.storage.local.set(values);
      callback();
    };

    setValueInStore({
      [key]: value,
    });
  }else{
    localStorage.setItem(key, JSON.stringify(value));
  }
};
