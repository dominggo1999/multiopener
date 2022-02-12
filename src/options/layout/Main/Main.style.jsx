import tw, { styled } from 'twin.macro';

export const StyledMain = styled.div`
  ${tw`
    w-full
    min-h-screen
    flex 
    flex-col
  `}
`;

export const MainContainer = styled.div`
  ${tw`
    w-full
    h-full
    p-4
    bg-main-light  
  `}
`;
