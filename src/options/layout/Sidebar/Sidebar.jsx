import React, { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { IoIosLink, IoIosColorPalette } from 'react-icons/io';
import { FiSettings } from 'react-icons/fi';
import {
  SidebarWrapper, SidebarScrollArea, NavMenu, NavItem,
}from './Sidebar.style';
import { SidebarContext } from '../../context/Sidebar.context';
import useSizes from '../../../hooks/useSizes';

const Sidebar = () => {
  const { show, close } = useContext(SidebarContext);
  const { isXLarge } = useSizes();

  useEffect(() => {
    // Always close sidebar on xlarge screen size
    close();
  }, [isXLarge]);

  return (
    <SidebarWrapper open={show}>
      <SidebarScrollArea>
        <NavMenu>
          <NavItem>
            <NavLink to="/dist/options/index.html">
              <IoIosLink />
              Links
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink to="/dist/options/index.html">
              <FiSettings />
              Settings
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink to="/dist/options/index.html">
              <IoIosColorPalette />
              Appearance
            </NavLink>
          </NavItem>

        </NavMenu>
      </SidebarScrollArea>
    </SidebarWrapper>
  );
};

export default Sidebar;
