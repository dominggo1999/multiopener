import React, { useEffect, useState } from 'react';
import {
  WebsiteList, SearchArea, TypeTitle, Overlay,
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
        }
      }
    };

    window.addEventListener('keydown', keyBindings);

    return () => {
      window.removeEventListener('keydown', keyBindings);
    };
  }, []);

  return (
    <>
      <Overlay
        onClick={closeSearchBox}
        role="button"
      />
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
    </>
  );
};

export default SearchBox;
