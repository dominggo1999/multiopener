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
    py-3
    px-4 
    shadow 
    text-lg 
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
      text-xl
      hover:text-accent
    `}
  }
`;

export const Info = styled.div`
  ${tw`
    flex
    items-center
    gap-3
  `}

   span{
    ${tw`
      select-none
    `}
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
