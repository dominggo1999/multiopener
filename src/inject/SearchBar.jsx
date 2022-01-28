import React, { useEffect, useRef } from 'react';
import { SearchBarContainer } from './SearchBar.style';

const SearchBar = ({ query, setQuery }) => {
  const inputRef = useRef();

  useEffect(() => {
    const focusOnIframe = () => {
      inputRef.current.focus();
    };

    window.addEventListener('focus', focusOnIframe);

    return () => {
      window.removeEventListener('focus', focusOnIframe);
    };
  }, []);

  return (
    <SearchBarContainer onSubmit={(e) => e.preventDefault()}>
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search something"
      />
    </SearchBarContainer>
  );
};

export default SearchBar;
