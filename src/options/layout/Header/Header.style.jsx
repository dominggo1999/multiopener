import tw, { styled } from 'twin.macro';

export const StyledHeader = styled.header`
  ${tw`
    flex 
    justify-between 
    items-center
    py-4
    px-4 
    text-2xl 
    bg-white
    dark:(bg-primary shadow-none)
    transition 
    transition-bg
    ease-out-sine
    duration-400
  `}

  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
`;

export const MenuIcon = styled.button`
  ${tw`
    text-3xl
    dark:text-white
  `}
`;

export const PageTitle = styled.h1`
  ${tw`
    dark:text-light-text
    text-primary
    capitalize
    font-semibold
  `}
`;
