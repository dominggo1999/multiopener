import React, { useEffect, useRef } from 'react';
import {
  SearchBarContainer, EscapeKeyWrapper, EscapeKeyChar,
} from './SearchBar.style';

const SearchBar = ({
  query, setQuery, setKeyMode, handleClose,
}) => {
  const inputRef = useRef();
  const activateKeyMode = () => setKeyMode(true);
  const deactiveKeyMode = () => setKeyMode(false);

  useEffect(() => {
    const searchBarFocus = () => {
      inputRef.current.focus();
    };

    const keyBindingFocusOnIframe = (e) => {
      const key = e.key;

      if(key === '.' && e.ctrlKey) {
        searchBarFocus();
      }
    };

    searchBarFocus();

    window.addEventListener('focus', searchBarFocus);
    window.addEventListener('keydown', keyBindingFocusOnIframe);

    return () => {
      window.removeEventListener('focus', searchBarFocus);
      window.removeEventListener('keydown', keyBindingFocusOnIframe);
    };
  }, []);

  return (
    <SearchBarContainer onSubmit={(e) => e.preventDefault()}>
      <input
        ref={inputRef}
        type="text"
        value={query}
        onFocus={deactiveKeyMode}
        onBlur={activateKeyMode}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search something"
      />
      <EscapeKeyWrapper tabIndex="-1">
        <EscapeKeyChar
          onClick={handleClose}
          tabIndex="-1"
        >
          Esc
        </EscapeKeyChar>
      </EscapeKeyWrapper>
    </SearchBarContainer>
  );
};

export default SearchBar;
