import React, { useEffect, useState } from 'react';
import {
  SearchBoxContainer, WebsiteList, SearchArea, TypeTitle, Overlay,
} from './SearchBox.style';
import SearchBar from './SearchBar';
import Groups from './links/Groups';
import Single from './links/Single';

const sendMessage = async (message) => {
  await chrome.runtime?.sendMessage(message);
};

const browserTabs = chrome.tabs;

const closeSearchBox = () => {
  browserTabs?.query({}, (tabs) => {
    const id = tabs.filter((i) => i.active)[0].id;
    browserTabs.sendMessage(id, { message: 'close frame' });
  });
};

const SearchBox = () => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const keyBindings = (e) => {
      const key = e.key;

      if((key === ',' && e.ctrlKey) || key === 'Escape') {
        closeSearchBox();
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
