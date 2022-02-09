import React from 'react';
import tw, { styled } from 'twin.macro';

export const BackdopOverlay = styled.div`
  ${tw`
    fixed 
    z-40
    inset-0 
  `}

  background : rgb(15,23,42);
  transition : opacity ease-in-out 200ms;

  ${({ open }) => (open ? tw`opacity-30` : tw`opacity-0 pointer-events-none`)}
`;

const Backdrop = ({ open, handleClose }) => {
  return (
    <BackdopOverlay
      open={open}
      onClick={handleClose}
      role="banner"
    >
    </BackdopOverlay>
  );
};

export default Backdrop;
