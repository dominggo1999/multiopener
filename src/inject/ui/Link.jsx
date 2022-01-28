import React from 'react';
import tw, { styled } from 'twin.macro';

export const StyledLink = styled.a`
  ${tw`
    inline-block
    w-full 
    p-1 
    cursor-pointer 
    text-[#11494d] 
    hover:text-[#EA4C89]
    font-semibold  
    capitalize
    flex 
    items-center
  `}
`;

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
