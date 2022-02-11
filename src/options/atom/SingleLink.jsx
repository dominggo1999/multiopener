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
    text-lg 
    font-semibold
    mb-2
    border
    border-accent
  `}
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

export const Actions = styled.div`
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
        <button>
          <Link to={`/edit-link/${id}`}>
            <AiOutlineEdit />
          </Link>
        </button>
        <button>
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
