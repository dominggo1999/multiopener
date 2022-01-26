import React from 'react';
import tw, { styled } from 'twin.macro';

export const StyledLink = styled.a`
  ${tw`
    inline-block
    bg-red-500 
    w-full 
    py-2
    px-1 
    cursor-pointer
  `}
`;

const Link = ({ title, ...rest }) => {
  return (
    <StyledLink
      {...rest}
    >
      {title}
    </StyledLink>
  );
};

export default Link;
