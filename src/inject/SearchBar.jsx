import React from 'react';
import { SearchBarContainer } from './SearchBar.style';

const SearchBar = ({ query, setQuery }) => {
  return (
    <SearchBarContainer>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </SearchBarContainer>
  );
};

export default SearchBar;
