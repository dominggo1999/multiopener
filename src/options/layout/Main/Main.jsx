import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import { SidebarContext } from '../../context/Sidebar.context';
import { MainContainer, StyledMain } from './Main.style';
import Header from '../Header/Header';
import Links from '../Links/Links';
import Options from '../../Template';
import AddNewLink from '../AddNewLink/AddNewLink';
import AddNewGroup from '../AddNewGroup/AddNewGroup';
import EditLink from '../EditLink/EditLink';
import EditGroup from '../EditGroup/EditGroup';
import { storageGet } from '../../../util';

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
          <Route
            exact
            path="/edit-link/:linkId"
          >
            <EditLink />
          </Route>
          <Route
            exact
            path="/edit-group/:groupId"
          >
            <EditGroup />
          </Route>
        </Switch>
        {/* <Options /> */}
      </MainContainer>
    </StyledMain>
  );
};

export default Main;
