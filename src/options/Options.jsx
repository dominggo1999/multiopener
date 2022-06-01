import React, { useContext } from 'react';
import Sidebar from './layout/Sidebar/Sidebar';
import Main from './layout/Main/Main';
import { OptionsContainer } from './Options.style';
import SidebarProvider from '../context/Sidebar.context';
import { ThemeContext } from '../theme/ThemeProvider';
import useWebStorage from '../hooks/useWebStorage';

const Options = () => {
  // If in standalone website use localStorage
  useWebStorage();

  const { theme, mode } = useContext(ThemeContext);

  return (
    <SidebarProvider>
      <OptionsContainer className={`${theme} ${mode}`}>
        <Sidebar />
        <Main />
      </OptionsContainer>
    </SidebarProvider>
  );
};

export default Options;
