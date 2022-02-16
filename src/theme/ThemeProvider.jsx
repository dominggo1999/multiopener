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

      if (storedTheme) {
        setTheme(storedTheme);
      } else {
        storageSet('theme', DEFAULT_THEME);
        setTheme(DEFAULT_THEME);
      }
    };

    applyTheme();
  }, []);

  useEffect(() => {
    const applyMode = async () => {
      const storedMode = await storageGet('mode');
      if(storedMode) {
        setMode(storedMode);
      }else{
        storageSet('mode', DEFAULT_MODE);
        setMode(DEFAULT_MODE);
      }
    };

    applyMode();
  }, []);

  useEffect(() => {
    if(theme) {
      storageSet('theme', theme);
    }
  }, [theme]);

  useEffect(() => {
    if(mode) {
      storageSet('mode', mode);
    }
  }, [mode]);

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
