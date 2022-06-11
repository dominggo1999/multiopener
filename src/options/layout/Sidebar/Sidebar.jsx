import React, {
  useState, useContext, useEffect, useRef, useLayoutEffect,
} from 'react';
import { IoIosLink, IoIosColorPalette } from 'react-icons/io';
import { MdClose } from 'react-icons/md';
import { FiSettings } from 'react-icons/fi';
import { BsSearch } from 'react-icons/bs';
import { FaChrome } from 'react-icons/fa';
import { NavLink } from '../../atom/RouterLink';
import {
  SidebarWrapper, SidebarScrollArea, SidebarHeader, NavMenu, NavItem, SidebarBrand,
} from './Sidebar.style';
import { SidebarContext } from '../../../context/Sidebar.context';
import useSizes from '../../../hooks/useSizes';
import Backdrop from '../../atom/Backdrop';

const links = [
  {
    path: '/',
    name: 'links',
    Icon: IoIosLink,
  },
  {
    path: '/search',
    name: 'search',
    Icon: BsSearch,
  },
  {
    path: '/settings',
    name: 'settings',
    Icon: FiSettings,
    onlyExtension: true,
  },
  {
    path: '/theme',
    name: 'theme',
    Icon: IoIosColorPalette,
  },
];

const Sidebar = () => {
  const { show, close } = useContext(SidebarContext);
  const { isXLarge } = useSizes();
  const navigationRef = useRef();

  // Sidebar logic
  useEffect(() => {
    // Always close sidebar on xlarge screen size
    close();
  }, [isXLarge]);

  return (
    <>
      <Backdrop
        open={show}
        handleClose={close}
      />
      <SidebarWrapper open={show}>
        <SidebarHeader>
          <SidebarBrand>
            Multi Search
          </SidebarBrand>
          {
            !isXLarge
            && (
              <button onClick={close}>
                <MdClose />
              </button>
            )
          }
        </SidebarHeader>
        <SidebarScrollArea>
          <NavMenu ref={navigationRef}>
            {
              links?.length > 0 && links.map((i) => {
                if (i.onlyExtension && !chrome.storage) return null;
                return (
                  <NavItem key={`sidebar_link_${i.name}`}>
                    <NavLink
                      handleClick={close}
                      exact
                      to={i.path}
                    >
                      <i.Icon />
                      {i.name}
                    </NavLink>
                  </NavItem>
                );
              })
            }
          </NavMenu>
        </SidebarScrollArea>
      </SidebarWrapper>
    </>
  );
};

export default Sidebar;
