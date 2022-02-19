import React from 'react';
import SearchBox from '../../../inject/SearchBox';
import { SearchWrapper } from './Search.style';

const Search = () => {
  return (
    <SearchWrapper>
      <SearchBox embedded />
    </SearchWrapper>
  );
};

export default Search;
