import React, {
  useEffect, useState, useRef, useContext,
} from 'react';
import {
  WebsiteList, SearchArea, TypeTitle, Overlay, SearchAreaWrapper, LoadingIndicator,
} from './SearchBox.style';
import SearchBar from './SearchBar';
import Groups from './links/Groups';
import Single from './links/Single';
import { storageGet } from '../util';
import { ThemeContext } from '../theme/ThemeProvider';

const browserTabs = chrome.tabs;

const closeSearchBox = async () => {
  const queryOptions = { active: true, currentWindow: true };

  const [tab] = await browserTabs.query(queryOptions);

  browserTabs.sendMessage(tab.id, { message: 'close frame' });
};

const groupKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
const singleKeys = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm'];

const getFocusable = () => {
  const focusable = document.querySelectorAll('button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])');
  const firstFocusable = focusable[0];
  const lastFocusable = focusable[focusable.length - 1];

  return { focusable, firstFocusable, lastFocusable };
};

const SearchBox = () => {
  const [query, setQuery] = useState('');
  const [keyMode, setKeyMode] = useState(true);
  const groupRef = useRef();
  const singleRef = useRef();
  const [links, setLinks] = useState([]);
  const [groups, setGroups] = useState([]);
  const [rendered, setRendered] = useState(false);
  const force = useRef(false);
  const { theme } = useContext(ThemeContext);

  const getData = async () => {
    const links = await storageGet('links');
    const groups = await storageGet('groups');

    setLinks(links);
    setGroups(groups);
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
      getData();
      force.current = !force.current;
    };

    if(rendered) {
      window.addEventListener('keydown', keyBindings);
      window.addEventListener('keydown', tabNavigation);
      window.addEventListener('keydown', keyNavigation);
      window.addEventListener('focus', updateData);

      return () => {
        window.removeEventListener('keydown', keyBindings);
        window.removeEventListener('keydown', tabNavigation);
        window.removeEventListener('keydown', keyNavigation);
        window.removeEventListener('focus', updateData);
      };
    }
  }, [rendered, force.current]);

  const handleClose = () => {
    if (chrome.runtime?.id) {
      closeSearchBox();
    }else{
      window.parent.postMessage('close iframe', '*');
    }
  };

  useEffect(() => {
    getData();
    setRendered(true);
  }, []);

  return (
    <>
      <Overlay
        onClick={handleClose}
        role="button"
      />

      <SearchAreaWrapper className={theme}>
        <SearchArea>
          <SearchBar
            setKeyMode={setKeyMode}
            setQuery={setQuery}
            query={query}
            rendered={rendered}
            handleClose={handleClose}
          />

          {
            rendered
              ? (
                <>
                  <TypeTitle>Groups</TypeTitle>
                  <WebsiteList
                    ref={groupRef}
                  >
                    <Groups
                      groups={groups}
                      query={query}
                      groupKeys={groupKeys}
                      keyMode={keyMode}
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
                    />
                  </WebsiteList>
                </>
              )
              : (
                <LoadingIndicator>
                  <span className="loader"></span>
                </LoadingIndicator>
              )
          }

        </SearchArea>
      </SearchAreaWrapper>
    </>
  );
};

export default SearchBox;
