import React, { useContext } from 'react';
import Sidebar from './layout/Sidebar/Sidebar';
import Main from './layout/Main/Main';
import { OptionsContainer } from './Options.style';
import SidebarProvider from './context/Sidebar.context';
import { ThemeContext } from '../theme/ThemeProvider';

const Options = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <SidebarProvider>
      <OptionsContainer className={theme}>
        <Sidebar />
        <Main />
      </OptionsContainer>
    </SidebarProvider>
  );
};

export default Options;
