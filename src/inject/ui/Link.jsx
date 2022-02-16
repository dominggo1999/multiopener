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
    font-medium  
    capitalize
    flex 
    items-center
    rounded-xl
    border
    border-transparent
    hover:(text-accent bg-primary)
    focus:(text-accent bg-primary outline-none)
  
    dark:(text-accent)  
    dark:hover:(bg-transparent text-accent border-accent)
    dark:focus:(bg-transparent text-accent border-accent)
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

      dark:(text-accent border-accent shadow-none opacity-100)
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
