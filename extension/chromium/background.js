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

const setValueInStore = async (values, callback = () => { }) => {
  await extensionStorage.set(values);

  callback();
};

const browserTabs = chrome.tabs;

const sendMessageToTab = async (tabId, message) => {
  if (chrome?.runtime?.id) {
    await browserTabs.sendMessage(tabId, message);
  }
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
    const match = domainAndSubdomain.exec(l); // Chrome extensions url will return null
    const targetDomain = match && match[1];

    // Find id of target url in existing tabs
    const targetTab = validTabs.filter((i) => {
      return i.url === targetDomain;
    })[0];

    if (targetTab) {
      chrome.tabs.update(targetTab.id, {
        url: l,
      });
    } else {
      chrome.tabs.create(
        {
          url: l,
          active: false,
        },
      );
    }
  });
};

const openOptionsPage = (url) => {
  const openedTabURL = url;
  const baseURL = `chrome-extension://${chrome.runtime.id}`;

  // Check if new tab is extension url
  const regexpTest = new RegExp(baseURL);

  // if true check if chrome extension url already  opened
  chrome.tabs.query({}, (tabs) => {
    let alreadyOpened = false;

    tabs.forEach((tab) => {
      const existingTabURL = tab.url;
      if (existingTabURL.match(regexpTest)) {
        alreadyOpened = true;

        chrome.tabs.update(tab.id, {
          active: true,
        });

        setTimeout(() => {
          if (openedTabURL !== existingTabURL) {
            chrome.tabs.update(tab.id, {
              url: openedTabURL,
            });
          }
        }, 300);
      }
    });

    if (!alreadyOpened) {
      chrome.tabs.create({
        active: true,
        url: openedTabURL,
      });
    }
  });
};

chrome.runtime.onMessage.addListener((req, sender, sendRes) => {
  const { message, links, url } = req;

  if (message === 'open group') {
    openURLS(links);
    sendRes(JSON.stringify({ ok: 'ok' }));
  }

  if (message === 'open options page') {
    openOptionsPage(url);
  }

  return true;
});

// prevent client from visiting options page via omnibox search
chrome.tabs.onUpdated.addListener((openedTabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    const openedTabURL = tab.url;
    const baseURL = `chrome-extension://${chrome.runtime.id}`;

    // Check if new tab is extension url
    const regexpTest = new RegExp(baseURL);

    if (openedTabURL.match(regexpTest)) {
      // if true check if chrome extension url already  opened
      chrome.tabs.query({}, (tabs) => {
        tabs.forEach((tab) => {
          const existingTabURL = tab.url;
          if (existingTabURL.match(regexpTest) && tab.id !== openedTabId) {
            chrome.tabs.update(tab.id, {
              active: true,
            });

            setTimeout(() => {
              if (openedTabURL !== existingTabURL) {
                chrome.tabs.update(tab.id, {
                  url: openedTabURL,
                });
              }
            }, 300);

            chrome.tabs.remove(
              openedTabId,
            );
          }
        });
      });
    }
  }
});

try { initSettings(); } catch (e) { console.error(e); }

// Context Menu
// Toggle search box with or without query
const toggleSearchBoxWithQuery = {
  title: 'Open search box with query',
  id: 'toggleSearchBoxWithQuery',
  contexts: ['selection'],
};

const toggleSearchBox = {
  title: 'Open search box',
  id: 'toggleSearchBox',
  contexts: ['page', 'frame', 'editable', 'image', 'video', 'audio'],
};

chrome.contextMenus.removeAll();
chrome.contextMenus.create(toggleSearchBox);
chrome.contextMenus.create(toggleSearchBoxWithQuery);

// Open options page url

chrome.contextMenus.onClicked.addListener((clickData, tab) => {
  const { menuItemId, selectionText } = clickData;
  const { id, url } = tab;

  const urlValidator = /(https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/i;
  // This validation is needed to prevent sending message to chrome://**/* and file://**/* since there is no content script there (there is no receiving end)
  const isNotLocalFile = urlValidator.test(url);
  const targetOptionUrl = `chrome-extension://${chrome.runtime.id}/dist/options/index.html#search`;

  if (menuItemId === 'toggleSearchBoxWithQuery') {
    if (isNotLocalFile) {
      sendMessageToTab(id, {
        contextMenu: 'toogle search box with query',
        selectionText,
      });
    } else {
      openOptionsPage(targetOptionUrl);
    }
  }

  if (menuItemId === 'toggleSearchBox') {
    if (isNotLocalFile) {
      sendMessageToTab(id, {
        contextMenu: 'toogle search box',
      });
    } else {
      openOptionsPage(targetOptionUrl);
    }
  }
});
