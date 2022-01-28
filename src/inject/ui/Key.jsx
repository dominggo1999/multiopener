import React from 'react';
import tw, { styled } from 'twin.macro';

const KeyWrapper = styled.div`
  ${tw`
    w-[20px]  
    h-full 
    mr-2 
    flex 
    items-center
  `}
`;

const KeyChar = styled.div`
  ${tw`
    text-[12px]
    w-[20px]
    h-[20px] 
    flex
    items-center 
    justify-center 
    rounded-[5px]    
    font-semibold
  `}

  color : ${({ keyMode }) => (keyMode ? '#EA4C89' : '#5c5c5c78')};

  box-shadow : ${({ keyMode }) => (keyMode ? 'rgba(49, 50, 51, 0.39) 0px 1px 2px 0px, rgba(54, 54, 54, 0.15) 0px 2px 6px 2px' : 'none')};

  background-color : ${({ keyMode }) => (keyMode ? 'none' : '#eeeeee')};

`;

const Key = ({ char, keyMode }) => {
  if(!char) return null;

  return (
    <KeyWrapper>
      <KeyChar keyMode={keyMode}>
        {char}
      </KeyChar>
    </KeyWrapper>
  );
};

export default Key;
