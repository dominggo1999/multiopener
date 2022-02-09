import tw, { styled } from 'twin.macro';
import React from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';

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

const SingleLinkInGroup = ({ title, removeLink }) => {
  return (
    <StyledLink>
      <span>
        {title}
      </span>
      <Actions>
        <button onClick={removeLink}>
          <RiDeleteBin6Line />
        </button>
      </Actions>
    </StyledLink>
  );
};

export default SingleLinkInGroup;
