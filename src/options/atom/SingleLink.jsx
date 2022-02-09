import React from 'react';
import tw, { styled } from 'twin.macro';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { AiOutlineEdit } from 'react-icons/ai';
import useLists from '../../hooks/useLists';

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

const SingleLink = ({ title, id, deleteLink }) => {
  return (
    <StyledSingleLink>
      <span>
        {title}
      </span>
      <Actions>
        <button onClick={() => deleteLink(id)}>
          <RiDeleteBin6Line />
        </button>
        <button>
          <AiOutlineEdit />
        </button>
      </Actions>
    </StyledSingleLink>
  );
};

export default SingleLink;
