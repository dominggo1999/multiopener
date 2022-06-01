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

const setValueInStore = async (values, callback = () => { }) => {
  await extensionStorage.set(values);

  callback();
};

const settings = [
  {
    key: 'links',
    default: [],
  },
  {
    key: 'groups',
    default: [],
  },
  {
    key: 'theme',
    default: 'blue-origin',
  },
  {
    key: 'mode',
    default: 'light',
  },
  {
    key: 'showTooltip',
    default: true,
  },
];

const initSettings = () => {
  const keys = settings.map((i) => i.key);

  extensionStorage.get(keys, (results) => {
    const isEmpty = (val) => val === undefined;

    settings.forEach((i) => {
      if (isEmpty(results[i.key])) {
        setValueInStore({
          [i.key]: i.default,
        });
      }
    });
  });
};

export default initSettings;
