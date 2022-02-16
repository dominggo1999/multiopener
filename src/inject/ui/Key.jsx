import React from 'react';
import tw, { styled } from 'twin.macro';

export const KeyWrapper = styled.div`
  ${tw`
    w-[20px]  
    h-full 
    mr-2 
    flex 
    items-center
  `}
`;

export const KeyChar = styled.div`
  ${tw`
    text-[12px]
    w-[20px]
    h-[20px] 
    flex
    items-center 
    justify-center 
    rounded-[5px]    
    font-bold
    border
    border-transparent
  `}

  box-shadow : ${({ keyMode }) => (keyMode ? 'rgba(49, 50, 51, 0.39) 0px 1px 2px 0px, rgba(54, 54, 54, 0.15) 0px 2px 6px 2px' : 'none')};


  ${({ keyMode, dark }) => (keyMode
    ? tw`
      bg-none 
      text-key-tuts-active
      `
    : tw`
      bg-main-background 
      text-key-tuts-passive
      `
  )}



  ${({ keyMode, dark }) => {
    if(!dark) {
      if(keyMode) {
        return tw`
          bg-none 
          text-key-tuts-active
        `;
      }

      return tw`
          bg-main-background 
          text-key-tuts-passive
        `;
    }

    if(keyMode) {
      return tw`
        bg-transparent
        text-accent
        opacity-100
      `;
    }

    return tw`
        bg-transparent
        text-accent
        opacity-40
    `;
  }}

`;

const Key = ({ char, keyMode, mode }) => {
  const dark = mode === 'dark';

  return (
    <KeyWrapper>
      {
        char
        && (
        <KeyChar
          dark={dark}
          keyMode={keyMode}
        >
          {char}
        </KeyChar>
        )
      }
    </KeyWrapper>
  );
};

export default Key;
