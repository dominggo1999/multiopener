import tw, { styled } from 'twin.macro';

export const MenuWrapper = styled.div`
  ${tw`
    bg-white 
    dark:(bg-primary shadow-none)
    flex
    w-full 
    mb-4
    rounded-xl
    max-w-2xl
    p-10
    shadow
  `}
`;
