import React, {
  useState, useContext, useEffect, useRef,
} from 'react';
import { NavLink } from 'react-router-dom';
import { IoIosLink, IoIosColorPalette } from 'react-icons/io';
import { MdClose } from 'react-icons/md';
import { FiSettings } from 'react-icons/fi';
import { gsap } from 'gsap';
import {
  SidebarWrapper, SidebarScrollArea, SidebarHeader, NavMenu, NavItem, SidebarBrand,
}from './Sidebar.style';
import { SidebarContext } from '../../context/Sidebar.context';
import useSizes from '../../../hooks/useSizes';
import Backdrop from '../../atom/Backdrop';

const Sidebar = () => {
  const { show, close } = useContext(SidebarContext);
  const { isXLarge } = useSizes();
  const navigationRef = useRef();
  const [render, setRender] = useState(false);

  // Sidebar logic
  useEffect(() => {
    // Always close sidebar on xlarge screen size
    close();
  }, [isXLarge]);

  // Animation logic
  useEffect(() => {
    const links = gsap.utils.selector(navigationRef);

    if(show || !render) {
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

    setRender(true);
  }, [show]);

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
    </>
  );
};

export default Sidebar;
