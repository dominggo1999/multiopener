import React, { createContext, useState, useEffect } from 'react';
import { storageGet, storageSet } from '../util';

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState();

  useEffect(() => {
    const applyTheme = async () => {
      const localStorageTheme = await storageGet('theme');
      if (localStorageTheme) {
        setTheme(localStorageTheme);
      } else {
        storageSet('theme', 'default');
        setTheme('default');
      }
    };

    applyTheme();
  }, []);

  useEffect(() => {
    if(theme) {
      storageSet('theme', theme);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      { theme && children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
