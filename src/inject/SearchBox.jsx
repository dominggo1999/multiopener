/* eslint-disable no-restricted-globals */
import React, {
  useEffect, useState, useRef, useContext,
} from 'react';
import {
  WebsiteList, SearchArea, TypeTitle, Overlay, SearchAreaWrapper,
} from './SearchBox.style';
import SearchBar from './SearchBar';
import Groups from './links/Groups';
import Single from './links/Single';
import { storageGet } from '../util';
import HelperNavigation from './HelperNavigation';
import { ThemeContext } from '../theme/ThemeProvider';
import { ListContext } from '../context/List.context';

const browserTabs = chrome.tabs;

const closeSearchBox = async () => {
  const queryOptions = { active: true, currentWindow: true };

  const [tab] = await browserTabs.query(queryOptions);

  browserTabs.sendMessage(tab.id, { message: 'close frame' });
};

const groupKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
const singleKeys = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm'];

// Embedded : options page
// Injected : injected iframe via content script
const SearchBox = ({ embedded, injected }) => {
  const [query, setQuery] = useState('');
  const [keyMode, setKeyMode] = useState(true);
  const searchBoxRef = useRef();
  const groupRef = useRef();
  const singleRef = useRef();
  const inboxRef = useRef(false);
  const [rendered, setRendered] = useState(false);

  // When embedded search box cannot listened to message, so need state from parent
  const {
    mode: parentMode,
    theme: parentTheme,
  } = embedded ? useContext(ThemeContext) : {};

  const {
    links: parentLinks,
    groups: parentGroups,
  } = embedded ? useContext(ListContext) : {};

  const [mode, setMode] = embedded ? [parentMode, () => {}] : useState();
  const [theme, setTheme] = embedded ? [parentTheme, () => {}] : useState();
  const [groups, setGroups] = embedded ? [parentGroups, () => {}] : useState([]);
  const [links, setLinks] = embedded ? [parentLinks, () => {}] : useState([]);

  const getData = async () => {
    const links = await storageGet('links', injected);
    const groups = await storageGet('groups', injected);
    const storedTheme = await storageGet('theme', injected);
    const storedMode = await storageGet('mode', injected);

    if(injected) {
      setTheme(storedTheme);
      setLinks(links);
      setGroups(groups);
      setMode(storedMode);
    }

    setRendered(true);
  };

  const getFocusable = () => {
    const parent = embedded ? searchBoxRef.current : document;
    const focusable = parent.querySelectorAll('button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const firstFocusable = focusable[0];
    const lastFocusable = focusable[focusable.length - 1];

    return { focusable, firstFocusable, lastFocusable };
  };

  useEffect(() => {
    const keyBindings = (e) => {
      const key = e.key;

      if((key === ',' && e.ctrlKey) || key === 'Escape') {
        if (chrome.runtime?.id) {
          closeSearchBox();
        }else{
          window.parent.postMessage('close iframe', '*');
        }
      }
    };

    const tabNavigation = (e) => {
      const { firstFocusable, lastFocusable } = getFocusable();

      if (e.key.toLowerCase() === 'tab') {
        const target = e.target;

        if(e.shiftKey) {
          if(target === firstFocusable) {
            e.preventDefault();
            lastFocusable.focus();
          }
        }else if(target === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    };

    const keyNavigation = (e) => {
      const { firstFocusable } = getFocusable();

      if(document.activeElement !== firstFocusable) {
        const key = e.key;

        if(groupKeys.includes(key)) {
          const index = groupKeys.indexOf(key);
          const target = groupRef.current.querySelectorAll('button')[index];

          target?.focus();
        }

        if(singleKeys.includes(key)) {
          const index = singleKeys.indexOf(key);
          const target = singleRef.current.querySelectorAll('a')[index];
          target?.focus();
        }
      }
    };

    const updateData = () => {
      // Reduce rerender, only rerender if there is update in storage
      if(inboxRef.current) {
        getData();
        inboxRef.current = false;
      }
    };

    if(rendered) {
      // Only need keybindings on injected
      injected && window.addEventListener('keydown', keyBindings);

      window.addEventListener('keydown', tabNavigation);
      window.addEventListener('keydown', keyNavigation);
      window.addEventListener('focus', updateData);

      return () => {
        injected && window.removeEventListener('keydown', keyBindings);

        window.removeEventListener('keydown', tabNavigation);
        window.removeEventListener('keydown', keyNavigation);
        window.removeEventListener('focus', updateData);
      };
    }
  }, [rendered]);

  const handleClose = () => {
    if (chrome.runtime?.id) {
      closeSearchBox();
    }else{
      window.parent.postMessage('close iframe', '*');
    }
  };

  useEffect(() => {
    const handleMessage = (e) => {
      if(e.message === 'please rerender') {
        inboxRef.current = true;
      }
    };

    const queryFromSelection = (e) => {
      if(e.data.message === 'unmount react') {
        setQuery(e.data.query);
      }
    };

    injected && chrome?.runtime?.onMessage.addListener(handleMessage);
    injected && window.addEventListener('message', queryFromSelection);
    return () => {
      injected && chrome?.runtime?.onMessage.removeListener(handleMessage);
      injected && window.removeEventListener('message', queryFromSelection);
    };
  }, []);

  useEffect(() => {
    getData();
  }, []);

  if(!theme || !mode) return null;

  return (
    <>
      {
        injected && (
        <Overlay
          onClick={handleClose}
          role="button"
        />
        )
      }

      <SearchAreaWrapper
        ref={searchBoxRef}
        embedded={embedded}
        className={injected ? `${theme} ${mode}` : null}
      >
        <SearchArea embedded={embedded}>
          <SearchBar
            setKeyMode={setKeyMode}
            setQuery={setQuery}
            query={query}
            rendered={rendered}
            handleClose={handleClose}
            injected={injected}
          />
          {
            injected ? <HelperNavigation /> : <br />
          }

          <TypeTitle>Groups</TypeTitle>
          <WebsiteList
            ref={groupRef}
          >
            <Groups
              groups={groups}
              query={query}
              groupKeys={groupKeys}
              keyMode={keyMode}
              mode={mode}
              embedded={embedded}
            />
          </WebsiteList>
          <TypeTitle>Single</TypeTitle>
          <WebsiteList
            ref={singleRef}
          >
            <Single
              links={links}
              query={query}
              singleKeys={singleKeys}
              keyMode={keyMode}
              mode={mode}
            />
          </WebsiteList>

        </SearchArea>
      </SearchAreaWrapper>
    </>
  );
};

export default SearchBox;
