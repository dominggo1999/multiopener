import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import { SidebarContext } from '../../context/Sidebar.context';
import { MainContainer, StyledMain } from './Main.style';
import Header from '../Header/Header';
import Links from '../Links/Links';
import Options from '../../Template';
import AddNewLink from '../AddNewLink/AddNewLink';
import AddNewGroup from '../AddNewGroup/AddNewGroup';

const Main = () => {
  return (
    <StyledMain>
      <Header />
      <MainContainer>
        <Switch>
          <Route
            exact
            path="/"
          >
            <Links />
          </Route>
          <Route
            exact
            path="/settings"
          >
            Ini settings
          </Route>
          <Route
            exact
            path="/appearance"
          >
            Ini appearance
          </Route>
          <Route
            exact
            path="/add-new-link"
          >
            <AddNewLink />
          </Route>
          <Route
            exact
            path="/add-new-group"
          >
            <AddNewGroup />
          </Route>
        </Switch>
        {/* <Options /> */}
      </MainContainer>
    </StyledMain>
  );
};

export default Main;
