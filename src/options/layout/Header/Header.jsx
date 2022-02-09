import React, { useContext } from 'react';
import { BiMenuAltLeft } from 'react-icons/bi';
import { StyledHeader, MenuIcon } from './Header.style';
import { SidebarContext } from '../../context/Sidebar.context';
import useSizes from '../../../hooks/useSizes';

const Header = () => {
  const { open } = useContext(SidebarContext);
  const { isXLarge } = useSizes();

  return (
    <StyledHeader>
      {
        !isXLarge && (
          <MenuIcon onClick={open}>
            <BiMenuAltLeft />
          </MenuIcon>
        )
      }
      header
    </StyledHeader>
  );
};

export default Header;
