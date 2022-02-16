import React from 'react';
import { createGlobalStyle } from 'styled-components';
import tw, { theme, GlobalStyles as BaseStyles } from 'twin.macro';
import createStyle from '../theme/createStyle';

const styles = createStyle();

const CustomStyles = createGlobalStyle`
  body {
    ${tw`
      antialiased 
      relative
      w-full 
    `}
    font-size:100%;
  }

  #root-inject{
    ${tw`
      w-full 
      min-h-screen 
    `}
  }

  ${styles}
`;

const GlobalStyles = () => (
  <>
    <BaseStyles />
    <CustomStyles />
  </>
);

export default GlobalStyles;
