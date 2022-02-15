import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState();

  useEffect(() => {
    const localStorageTheme = localStorage.getItem('theme');
    if (localStorageTheme) {
      setTheme(localStorageTheme);
    } else {
      localStorage.setItem('theme', 'default');
      setTheme('default');
    }
  }, []);

  console.log(theme);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      { theme && children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
