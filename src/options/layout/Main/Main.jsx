import React, { useContext } from 'react';
import { SidebarContext } from '../../context/Sidebar.context';
import { MainContainer, StyledMain } from './Main.style';
import Header from '../Header/Header';
import Links from '../Links/Links';
import Options from '../../Template';

const Main = () => {
  return (
    <StyledMain>
      <Header />
      <MainContainer>
        <Links />
        {/* <Options /> */}
      </MainContainer>
    </StyledMain>
  );
};

export default Main;
