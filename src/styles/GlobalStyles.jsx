import React from 'react';
import { createGlobalStyle } from 'styled-components';
import tw, { theme, GlobalStyles as BaseStyles } from 'twin.macro';

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


  .default {
    --background : #0F172A;
    --main-light : #F1F5F9;
    --secondary : #2C3344;
    --shade : #1E293B;
    --accent : #2DD4BF;
  }

  .reddish {
    --background : #440000;
    --main-light : #f9f1f1;
    --secondary : #442c2c;
    --shade : #3b1e1e;
    --accent : #d42d2d;
  }
`;

const GlobalStyles = () => (
  <>
    <BaseStyles />
    <CustomStyles />
  </>
);

export default GlobalStyles;
