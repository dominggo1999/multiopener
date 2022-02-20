import React, { useContext } from 'react';
import { BiMenuAltLeft } from 'react-icons/bi';
import { StyledHeader, MenuIcon, PageTitle } from './Header.style';
import { SidebarContext } from '../../../context/Sidebar.context';
import useSizes from '../../../hooks/useSizes';
import useHeader from '../../../hooks/useHeader';

const Header = () => {
  const { open } = useContext(SidebarContext);
  const { isXLarge } = useSizes();
  const { title } = useHeader();

  return (
    <StyledHeader>
      {
        !isXLarge && (
          <MenuIcon onClick={open}>
            <BiMenuAltLeft />
          </MenuIcon>
        )
      }
      <PageTitle>{title}</PageTitle>

    </StyledHeader>
  );
};

export default Header;
