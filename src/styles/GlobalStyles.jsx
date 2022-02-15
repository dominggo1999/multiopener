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
    --primary : #0F172A;
    --secondary : #2C3344;
    --main-background : #F1F5F9;
    --accent : #2DD4BF;
    --accent-lighter : #44ebd4;
    --light-text : #ffffff;
  }

  .reddish {
    --primary : #2a0f16;
    --secondary : #ffffff;
    --main-background : #f9f1f4;
    --accent : #d33d5e;
    --accent-lighter : #eb4468;
    --light-text : #ffffff;
  }

  .dev {
    --primary : #1B2028;
    --secondary : #2C3344;
    --main-background : #F1F5F9;
    --accent : #23a9d5;
    --accent-lighter : #4abde4;
    --light-text : #ffffff;
  }

  .monokai {
    --primary : #272822;
    --secondary : #4d523f;
    --main-background : #fbffef;
    --accent : #A6E22E;
    --accent-lighter : #bdf057;
    --light-text : #e2e2dc;
  }

  .purply {
    --primary : #333A45;
    --secondary : #292c31;
    --main-background : #fbffef;
    --accent : #F44C7F;
    --accent-lighter : #fc86a9;
    --light-text : #e2e2dc;
  }
`;

const GlobalStyles = () => (
  <>
    <BaseStyles />
    <CustomStyles />
  </>
);

export default GlobalStyles;
