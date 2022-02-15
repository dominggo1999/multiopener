import React from 'react';
import tw, { styled } from 'twin.macro';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { AiOutlineEdit } from 'react-icons/ai';
import { FiExternalLink } from 'react-icons/fi';
import Link from './RouterLink';
import { createTestURL, getDomainAndSubDomain } from '../../util';
import LinkFavicon from './LinkFavicon';

export const StyledSingleLink = styled.div`
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
    text-base
    md:text-lg 
    font-semibold
    mb-2
    border
    border-accent
  `}

  button {
    ${tw`
      flex
      items-center
    `}
  }

  a{
    ${tw`
      mb-0
    `}
  }
`;

export const Info = styled.div`
  ${tw`
    flex
    items-center
    gap-3
    w-1/2 
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
`;

export const Actions = styled.div`
  ${tw`
    flex
    gap-x-2 
    md:gap-x-4 
  `}

  svg{
    ${tw`
      text-base
      md:text-xl
      hover:text-accent
    `}
  }
`;

const SingleLink = ({
  title, id, deleteLink, link,
}) => {
  const url = createTestURL(link);
  const domain = getDomainAndSubDomain(link);

  return (
    <StyledSingleLink>
      <Info>
        <LinkFavicon domain={domain} />
        <span>
          {title}
        </span>
      </Info>
      <Actions>
        <button onClick={() => deleteLink(id)}>
          <RiDeleteBin6Line />
        </button>
        <button tabIndex="-1">
          <Link to={`/edit-link/${id}`}>
            <AiOutlineEdit />
          </Link>
        </button>
        <button tabIndex="-1">
          <a
            target="_blank"
            href={url}
            rel="noreferrer"
          >
            <FiExternalLink />
          </a>
        </button>
      </Actions>
    </StyledSingleLink>
  );
};

export default SingleLink;
