import React, { useState } from 'react';
import tw, { styled } from 'twin.macro';
import { FaFolder } from 'react-icons/fa';
import { BiWorld } from 'react-icons/bi';

const IconWrapper = styled.div`
  ${tw`
    mr-2 
    w-[20px] 
    h-full 
  `}
`;

const Icon = ({ domain }) => {
  const[error, setError] = useState(false);

  return (
    <IconWrapper>
      {
        !error && domain && (
          <img
            onError={() => setError(true)}
            src={`https://s2.googleusercontent.com/s2/favicons?domain=${domain}`}
            alt={`icon_${domain}`}
          />
        )
      }
      {
        !domain && <FaFolder />
      }
      {
        error && <BiWorld />
      }
    </IconWrapper>
  );
};

export default Icon;
