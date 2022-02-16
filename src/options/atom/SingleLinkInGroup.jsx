import tw, { styled } from 'twin.macro';
import React from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import LinkFavicon from './LinkFavicon';
import { getDomainAndSubDomain } from '../../util';

const StyledLink = styled.div`
  ${tw`
    flex  
    items-center 
    justify-between
    w-full 
    rounded-lg 
    bg-white
    dark:(bg-primary text-light-text border-transparent shadow-none)
    py-3
    px-4 
    shadow 
    text-base
    md:text-lg 
    font-semibold
    mb-2
    border
    border-accent
  `}
`;

const Actions = styled.div`
  ${tw`
    flex 
    gap-x-4 
  `}

  svg{
    ${tw`
      dark:(text-accent hover:text-light-text)
      text-base
      md:text-xl
      hover:text-accent
    `}
  }
`;

export const Info = styled.div`
  ${tw`
    flex
    items-center
    gap-3
    w-4/5 
    lg:w-4/5
  `}

  span{
    ${tw`
        select-none
        max-w-[400px]
        block
        truncate
      `}
    }
  }
`;

const SingleLinkInGroup = ({ title, link, removeLink }) => {
  const domain = getDomainAndSubDomain(link);

  return (
    <StyledLink>
      <Info>
        <LinkFavicon domain={domain} />
        <span>
          {title}
        </span>
      </Info>
      <Actions>
        <button onClick={removeLink}>
          <RiDeleteBin6Line />
        </button>
      </Actions>
    </StyledLink>
  );
};

export default SingleLinkInGroup;
