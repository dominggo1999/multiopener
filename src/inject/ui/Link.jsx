import React from 'react';
import tw, { styled } from 'twin.macro';
import { KeyChar } from './Key';

const StyledLink = styled.a`
  ${tw`
    inline-block
    w-full 
    px-3
    py-2 
    cursor-pointer 
    text-primary 
    hover:text-accent
    focus:text-accent
    hover:bg-primary
    focus:bg-primary
    font-medium  
    capitalize
    flex 
    items-center
    rounded-xl
  `}

  span{
    ${tw`
      truncate
    `}
  }

  &:hover ${KeyChar} ,
  &:focus ${KeyChar} {
    ${tw`
      text-accent
      border 
      border-accent
      bg-transparent
    `}
  }
`;

const Link = ({ title, children, ...rest }) => {
  return (
    <StyledLink
      {...rest}
    >
      {children}
      <span>
        {title}
      </span>
    </StyledLink>
  );
};

export default Link;
