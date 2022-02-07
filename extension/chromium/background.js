/* eslint-disable import/extensions */

import initSettings from './settings.js';

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

const openURLS = async (links) => {
  const domainAndSubdomain = /^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i;

  const tabs = await browserTabs?.query({});

  const validTabs = [];
  tabs.forEach((i) => {
    const match = domainAndSubdomain.exec(i.url);

    match && validTabs.push({
      url: match[1],
      id: i.id,
    });
  });

  links.forEach((l) => {
    const targetDomain = domainAndSubdomain.exec(l)[1];

    // Find id of target url in existing tabs

    const targetTab = validTabs.filter((i) => {
      return i.url === targetDomain;
    })[0];

    if(targetTab) {
      chrome.tabs.update(targetTab.id, {
        url: l,
      });
    }else{
      chrome.tabs.create(
        {
          url: l,
          active: false,
        },
      );
    }
  });
};

chrome.runtime.onMessage.addListener((req, sender, sendRes) => {
  const { message, links } = req;

  if(message === 'open group') {
    openURLS(links);
  }
});

try { initSettings(); } catch (e) { console.error(e); }
