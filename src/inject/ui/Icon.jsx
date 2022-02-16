import React, { useEffect, useState } from 'react';
import tw, { styled } from 'twin.macro';
import { FaFolder } from 'react-icons/fa';
import { BiWorld } from 'react-icons/bi';

const IconWrapper = styled.div`
  ${tw`
    mr-2 
    w-[20px] 
    h-[20px]
    flex
    items-center
  `}
`;

const Icon = ({ domain }) => {
  const[error, setError] = useState(false);
  const isOnline = navigator.onLine;

  return (
    <IconWrapper>
      {
        isOnline && !error && domain && (
          <img
            onError={() => setError(true)}
            src={`https://www.google.com/s2/favicons?sz=64&domain_url=${domain}`}
            alt={`icon_${domain}`}
          />
        )
      }
      {
        !domain && <FaFolder />
      }
      {
        domain && (error || !isOnline) && <BiWorld />
      }
    </IconWrapper>
  );
};

export default Icon;
