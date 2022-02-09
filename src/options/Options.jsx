import React from 'react';
import Sidebar from './layout/Sidebar/Sidebar';
import Main from './layout/Main/Main';
import { OptionsContainer } from './Options.style';
import SidebarProvider from './context/Sidebar.context';

const Options = () => {
  return (
    <SidebarProvider>
      <OptionsContainer>
        <Sidebar />
        <Main />
      </OptionsContainer>
    </SidebarProvider>
  );
};

export default Options;
