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


  ${({ keyMode }) => (keyMode ? tw`bg-none text-key-tuts-active` : tw`bg-main-background text-key-tuts-passive`)}

`;

const Key = ({ char, keyMode }) => {
  return (
    <KeyWrapper>
      {
        char
        && (
        <KeyChar keyMode={keyMode}>
          {char}
        </KeyChar>
        )
      }
    </KeyWrapper>
  );
};

export default Key;
