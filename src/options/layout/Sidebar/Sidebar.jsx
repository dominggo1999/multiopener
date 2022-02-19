import React, {
  useState, useContext, useEffect, useRef,
} from 'react';
import { IoIosLink, IoIosColorPalette } from 'react-icons/io';
import { MdClose } from 'react-icons/md';
import { FiSettings } from 'react-icons/fi';
import { BsSearch } from 'react-icons/bs';
import { gsap } from 'gsap';
import { NavLink } from '../../atom/RouterLink';
import {
  SidebarWrapper, SidebarScrollArea, SidebarHeader, NavMenu, NavItem, SidebarBrand,
}from './Sidebar.style';
import { SidebarContext } from '../../../context/Sidebar.context';
import useSizes from '../../../hooks/useSizes';
import Backdrop from '../../atom/Backdrop';

const Sidebar = () => {
  const { show, close } = useContext(SidebarContext);
  const { isXLarge } = useSizes();
  const navigationRef = useRef();
  const [render, setRender] = useState(false);

  // Animation logic
  useEffect(() => {
    const links = gsap.utils.selector(navigationRef);
    if(isXLarge || show) {
      gsap.fromTo(links('li'),
        {
          x: -150,
          opacity: 0.3,
        }, {
          x: 0,
          opacity: 1,
          duration: 0.45,
          stagger: 0.09,
        });
    }
  }, [show]);

  // Sidebar logic
  useEffect(() => {
    // Always close sidebar on xlarge screen size
    close();
  }, [isXLarge]);

  const handleClick = () => {
    close();
  };

  return (
    <>
      <Backdrop
        open={show}
        handleClose={close}
      />
      <SidebarWrapper open={show}>
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
        <SidebarScrollArea>
          <NavMenu ref={navigationRef}>
            <NavItem>
              <NavLink
                handleClick={handleClick}
                exact
                to="/"
              >
                <IoIosLink />
                Links
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                handleClick={handleClick}
                exact
                to="/search"
              >
                <BsSearch />
                Search
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                handleClick={handleClick}
                to="/settings"
              >
                <FiSettings />
                Settings
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                handleClick={handleClick}
                to="/theme"
              >
                <IoIosColorPalette />
                theme
              </NavLink>
            </NavItem>

          </NavMenu>
        </SidebarScrollArea>
      </SidebarWrapper>
    </>
  );
};

export default Sidebar;
