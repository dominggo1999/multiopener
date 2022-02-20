import React, { useContext } from 'react';
import { BiMenuAltLeft } from 'react-icons/bi';
import { StyledHeader, MenuIcon } from './Header.style';
import { SidebarContext } from '../../../context/Sidebar.context';
import useSizes from '../../../hooks/useSizes';
import useHeader from '../../../hooks/useHeader';

const Header = () => {
  const { open } = useContext(SidebarContext);
  const { isXLarge } = useSizes();

  useHeader();

  return (
    <StyledHeader>
      {
        !isXLarge && (
          <MenuIcon onClick={open}>
            <BiMenuAltLeft />
          </MenuIcon>
        )
      }
      <h1>header</h1>

    </StyledHeader>
  );
};

export default Header;
