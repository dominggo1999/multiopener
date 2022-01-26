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

const SearchBox = () => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const keyBindings = (e) => {
      const key = e.key;

      if(key === ',' && e.ctrlKey) {
        browserTabs?.query({}, (tabs) => {
          const id = tabs.filter((i) => i.active)[0].id;
          browserTabs.sendMessage(id, { message: 'close frame' });
        });
      }
    };

    window.addEventListener('keydown', keyBindings);

    return () => {
      window.removeEventListener('keydown', keyBindings);
    };
  }, []);

  return (
    <>
      <Overlay />
      <SearchBoxContainer>
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
      </SearchBoxContainer>
    </>
  );
};

export default SearchBox;
