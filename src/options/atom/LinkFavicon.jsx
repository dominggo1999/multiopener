import React, { useState } from 'react';
import tw, { styled } from 'twin.macro';
import { FaFolder } from 'react-icons/fa';
import { BiWorld } from 'react-icons/bi';

const IconWrapper = styled.div`
  ${tw`
    h-full 
  `}
`;

const LinkFavicon = ({ domain }) => {
  const[error, setError] = useState(false);

  return (
    <IconWrapper>
      {
        !error && domain && (
          <img
            onError={() => setError(true)}
            src={`https://www.google.com/s2/favicons?sz=64&domain_url=${domain}`}
            alt={`icon_${domain}`}
            width="20"
            height="20"
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

export default LinkFavicon;
