import React, { useEffect, useState, useRef } from 'react';
import {
  WebsiteList, SearchArea, TypeTitle, Overlay, SearchAreaWrapper,
} from './SearchBox.style';
import SearchBar from './SearchBar';
import Groups from './links/Groups';
import Single from './links/Single';
import { groups, links as singleLinks }from './temp-data';

const browserTabs = chrome.tabs;

const closeSearchBox = async () => {
  const queryOptions = { active: true, currentWindow: true };

  const [tab] = await browserTabs.query(queryOptions);

  browserTabs.sendMessage(tab.id, { message: 'close frame' });
};

const groupKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
const singleKeys = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm'];

const SearchBox = () => {
  const [query, setQuery] = useState('');
  const [keyMode, setKeyMode] = useState(true);
  const groupRef = useRef();
  const singleRef = useRef();

  useEffect(() => {
    const keyBindings = (e) => {
      const key = e.key;

      if((key === ',' && e.ctrlKey) || key === 'Escape') {
        if (chrome.runtime?.id) {
          closeSearchBox();
        }else{
          window.parent.postMessage('Second Page', '*');
        }
      }
    };
    const focusable = document.querySelectorAll('button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const firstFocusable = focusable[0];
    const lastFocusable = focusable[focusable.length - 1];

    const tabNavigation = (e) => {
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

    window.addEventListener('keydown', keyBindings);
    window.addEventListener('keydown', tabNavigation);
    window.addEventListener('keydown', keyNavigation);

    return () => {
      window.removeEventListener('keydown', keyBindings);
      window.removeEventListener('keydown', tabNavigation);
      window.removeEventListener('keydown', keyNavigation);
    };
  }, []);

  const handleOverlayClick = () => {
    if (chrome.runtime?.id) {
      closeSearchBox();
    }else{
      window.parent.postMessage('close iframe', '*');
    }
  };

  return (
    <>
      <Overlay
        onClick={handleOverlayClick}
        role="button"
      />
      <SearchAreaWrapper>
        <SearchArea>
          <SearchBar
            setKeyMode={setKeyMode}
            setQuery={setQuery}
            query={query}
          />
          <TypeTitle>Groups</TypeTitle>
          <WebsiteList
            ref={groupRef}
          >
            <Groups
              links={groups}
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
              links={singleLinks}
              query={query}
              singleKeys={singleKeys}
              keyMode={keyMode}
            />
          </WebsiteList>
        </SearchArea>
      </SearchAreaWrapper>
    </>
  );
};

export default SearchBox;
