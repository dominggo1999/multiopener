import React, { createContext } from 'react';
import useLists from '../hooks/useLists';

export const ListContext = createContext();

const ListProvider = ({ children }) => {
  const list = useLists();

  return (
    <ListContext.Provider value={list}>
      {children}
    </ListContext.Provider>
  );
};

export default ListProvider;
