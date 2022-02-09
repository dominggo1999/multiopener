import React from 'react';
import tw, { styled } from 'twin.macro';

const StyledLink = styled.a`
  ${tw`
    inline-block
    w-full 
    px-1
    py-2 
    cursor-pointer 
    text-[#11494d] 
    hover:text-[#EA4C89]
    hover:bg-[#f0f0f0]
    font-medium  
    capitalize
    flex 
    items-center
  `}
`;

export const StyledGroupLink = styled.button`
 ${tw`
    inline-block
    w-full 
    px-1
    py-2 
    cursor-pointer 
    text-[#11494d] 
    hover:text-[#EA4C89]
    hover:bg-[#f0f0f0]
    font-medium  
    capitalize
    flex 
    items-center
  `}
`;

export const GroupLink = ({ title, children, ...rest }) => {
  return (
    <StyledGroupLink
      {...rest}
    >
      {children}
      {title}
    </StyledGroupLink>
  );
};

const Link = ({ title, children, ...rest }) => {
  return (
    <StyledLink
      {...rest}
    >
      {children}
      {title}
    </StyledLink>
  );
};

export default Link;
