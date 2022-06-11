import React, { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import Sidebar from './layout/Sidebar/Sidebar';
import Main from './layout/Main/Main';
import { OptionsContainer } from './Options.style';
import SidebarProvider from '../context/Sidebar.context';
import { ThemeContext } from '../theme/ThemeProvider';
import useWebStorage from '../hooks/useWebStorage';

const iconsDir = chrome?.runtime?.id ? `chrome-extension://${chrome?.runtime?.id}/icons` : null;

const Options = () => {
  // If in standalone website use localStorage
  useWebStorage();

  const { theme, mode } = useContext(ThemeContext);

  return (
    <>
      {
        iconsDir && (
          <Helmet>
            <link
              rel="apple-touch-icon"
              sizes="180x180"
              href={`${iconsDir}/apple-touch-icon.png`}
            />
            <link
              rel="icon"
              type="image/png"
              sizes="32x32"
              href={`${iconsDir}/favicon-32x32.png`}
            />
            <link
              rel="icon"
              type="image/png"
              sizes="16x16"
              href={`${iconsDir}/favicon-16x16.png`}
            />
          </Helmet>
        )
      }

      <SidebarProvider>
        <OptionsContainer className={`${theme} ${mode}`}>
          <Sidebar />
          <Main />
        </OptionsContainer>
      </SidebarProvider>
    </>
  );
};

export default Options;
