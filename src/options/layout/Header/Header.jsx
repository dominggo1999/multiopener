import React, { useContext, useState } from 'react';
import { BiMenuAltLeft } from 'react-icons/bi';
import tw, { styled } from 'twin.macro';
import { StyledHeader, MenuIcon } from './Header.style';
import { SidebarContext } from '../../context/Sidebar.context';
import useSizes from '../../../hooks/useSizes';
import { ThemeContext } from '../../../theme/ThemeProvider';

const themeList = [
  'default',
  'reddish',
  'dev',
  'monokai',
  'purply',
  'wavez',
  'bushido',
];

const Header = () => {
  const { open } = useContext(SidebarContext);
  const { setTheme } = useContext(ThemeContext);
  const { isXLarge } = useSizes();
  const [themeIndex, setThemeIndex] = useState(0);

  const changeTheme = () => {
    const next = themeIndex + 1;

    if(next === themeList.length) {
      setThemeIndex(0);
      setTheme(themeList[0]);
    }else{
      setThemeIndex(next);
      setTheme(themeList[next]);
    }
  };

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
      <button onClick={changeTheme}>Change theme</button>
    </StyledHeader>
  );
};

export default Header;
