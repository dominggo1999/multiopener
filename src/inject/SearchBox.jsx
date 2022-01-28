import React, { useEffect, useState } from 'react';
import {
  WebsiteList, SearchArea, TypeTitle, Overlay, SearchAreaWrapper,
} from './SearchBox.style';
import SearchBar from './SearchBar';
import Groups from './links/Groups';
import Single from './links/Single';

const browserTabs = chrome.tabs;

const closeSearchBox = async () => {
  const queryOptions = { active: true, currentWindow: true };

  const [tab] = await browserTabs.query(queryOptions);

  browserTabs.sendMessage(tab.id, { message: 'close frame' });
};

const SearchBox = () => {
  const [query, setQuery] = useState('');

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

    window.addEventListener('keydown', keyBindings);
    window.addEventListener('keydown', tabNavigation);

    return () => {
      window.removeEventListener('keydown', keyBindings);
      window.removeEventListener('keydown', tabNavigation);
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
            setQuery={setQuery}
            query={query}
          />
          <TypeTitle>Groups</TypeTitle>
          <WebsiteList>
            <Groups query={query} />
          </WebsiteList>
          <TypeTitle>Single</TypeTitle>
          <WebsiteList>
            <Single query={query} />
          </WebsiteList>
        </SearchArea>
      </SearchAreaWrapper>
    </>
  );
};

export default SearchBox;
