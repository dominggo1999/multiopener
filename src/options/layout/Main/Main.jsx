// readable routes linter
/* eslint react/jsx-max-props-per-line: 0 */

import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { MainContainer, StyledMain } from './Main.style';
import Header from '../Header/Header';
import Links from '../Links/Links';
import AddNewLink from '../AddNewLink/AddNewLink';
import AddNewGroup from '../AddNewGroup/AddNewGroup';
import EditLink from '../EditLink/EditLink';
import EditGroup from '../EditGroup/EditGroup';
import Theme from '../Theme/Theme';
import Search from '../Search/Search';
import NotFoundPage from '../../atom/NotFoundPage';
import Settings from '../Settings/Settings';

const Main = () => {
  return (
    <StyledMain>
      <Header />
      <MainContainer>
        <Switch>
          <Route exact path="/">
            <Links />
          </Route>
          {
            chrome.storage && (
              <Route exact path="/settings">
                <Settings />
              </Route>
            )
          }
          <Route exact path="/theme">
            <Theme />
          </Route>
          <Route exact path="/search">
            <Search />
          </Route>
          <Route exact path="/add-new-link">
            <AddNewLink />
          </Route>
          <Route exact path="/add-new-group">
            <AddNewGroup />
          </Route>
          <Route exact path="/edit-link/:linkId">
            <EditLink />
          </Route>
          <Route exact path="/edit-group/:groupId">
            <EditGroup />
          </Route>
          <Route path="*">
            <NotFoundPage />
          </Route>
        </Switch>
      </MainContainer>
    </StyledMain>
  );
};

export default Main;
