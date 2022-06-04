import tw, { styled } from 'twin.macro';

export const StyledMain = styled.main`
  ${tw`
    w-full
    min-h-screen
    flex 
    flex-col 
    bg-main-background  
    dark:bg-primary
    transition 
    transition-bg
    ease-out-sine
    duration-400
  `}
`;

export const MainContainer = styled.section`
  ${tw`
    w-full
    h-full
    p-4 
  `}
`;
