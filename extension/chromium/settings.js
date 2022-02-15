// Set up database if not exists

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

const initSettings = () => {
  extensionStorage.get(['links', 'groups', 'settings', 'theme'], (results) => {
    const {
      links, groups, settings, theme,
    } = results;

    if(!links) {
      setValueInStore({
        links: [],
      });
    }

    if(!groups) {
      setValueInStore({
        groups: [],
      });
    }

    if(!settings) {
      setValueInStore({
        settings: {},
      });
    }

    if(!theme) {
      setValueInStore({
        theme: 'default',
      });
    }
  });
};

export default initSettings;
