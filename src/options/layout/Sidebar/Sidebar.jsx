import React, { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { IoIosLink, IoIosColorPalette } from 'react-icons/io';
import { MdClose } from 'react-icons/md';
import { FiSettings } from 'react-icons/fi';
import {
  SidebarWrapper, SidebarScrollArea, SidebarHeader, NavMenu, NavItem, SidebarBrand,
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
        <SidebarHeader>
          <SidebarBrand>
            Iamlazy
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
        <NavMenu>
          <NavItem>
            <NavLink to="/dist/options/index.html">
              <IoIosLink />
              Links
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink to="/dist/options/settings">
              <FiSettings />
              Settings
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink to="/dist/options/appearance">
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
