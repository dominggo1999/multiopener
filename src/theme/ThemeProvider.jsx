import React, { createContext, useState, useEffect } from 'react';
import { storageGet, storageSet } from '../util';

export const ThemeContext = createContext();

const DEFAULT_THEME = 'default';
const DEFAULT_MODE = 'light';

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState();
  const [mode, setMode] = useState();

  useEffect(() => {
    const applyTheme = async () => {
      const storedTheme = await storageGet('theme');
      const storedMode = await storageGet('mode');
      if (storedTheme) {
        setTheme(storedTheme);
        setMode(storedMode);
      } else {
        storageSet('theme', DEFAULT_THEME);
        setTheme(DEFAULT_THEME);
        storageSet('mode', DEFAULT_MODE);
        setMode(DEFAULT_MODE);
      }
    };

    applyTheme();
  }, []);

  useEffect(() => {
    if(theme || mode) {
      storageSet('theme', theme);
      storageSet('mode', mode);
    }
  }, [theme, mode]);

  return (
    <ThemeContext.Provider
      value={{
        theme, mode, setTheme, setMode,
      }}
    >
      { theme && mode && children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
