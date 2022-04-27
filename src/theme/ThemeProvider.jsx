import React, {
  createContext, useState, useEffect, useRef,
} from 'react';
import { storageGet, storageSet } from '../util';

export const ThemeContext = createContext();

const DEFAULT_THEME = 'blue-origin';
const DEFAULT_MODE = 'light';

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState();
  const [mode, setMode] = useState();

  const applyTheme = async () => {
    const storedTheme = await storageGet('theme');

    if (storedTheme) {
      setTheme(storedTheme);
    } else {
      storageSet('theme', DEFAULT_THEME);
      setTheme(DEFAULT_THEME);
    }
  };

  const applyMode = async () => {
    const storedMode = await storageGet('mode');
    if(storedMode) {
      setMode(storedMode);
    }else{
      storageSet('mode', DEFAULT_MODE);
      setMode(DEFAULT_MODE);
    }
  };

  useEffect(() => {
    applyTheme();
    applyMode();
  }, []);

  useEffect(() => {
    const handleMessage = (e, _, sendResponse) => {
      if(e.message === 'please rerender') {
        applyTheme();
        applyMode();

        sendResponse(JSON.stringify({ ok: 'ok' }));
        return true;
      }
    };

    chrome?.runtime?.onMessage.addListener(handleMessage);

    return () => {
      chrome?.runtime?.onMessage.removeListener(handleMessage);
    };
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
