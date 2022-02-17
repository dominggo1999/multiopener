import tw, { styled } from 'twin.macro';

export const MenuWrapper = styled.div`
  ${tw`
    bg-white 
    dark:(bg-primary shadow-none border border-accent border-transparent shadow-lg)
    flex
    w-full 
    mb-4
    rounded-xl
    sm:max-w-2xl
    py-10
    md:px-10
    px-5
    shadow
  `}
`;
