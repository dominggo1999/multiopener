import React from 'react';
import tw, { styled } from 'twin.macro';
import { FaFolder } from 'react-icons/fa';

const IconWrapper = styled.div`
  ${tw`
    mr-2 
    w-[20px] 
    h-full 
  `}
`;

const Icon = ({ domain }) => {
  return (
    <IconWrapper>
      {
        domain && (
          <img
            src={`https://s2.googleusercontent.com/s2/favicons?domain=${domain}`}
            alt={`icon_${domain}`}
          />
        )
      }
      {
        !domain && <FaFolder />
      }
    </IconWrapper>
  );
};

export default Icon;
