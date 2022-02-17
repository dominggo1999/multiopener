import tw, { styled } from 'twin.macro';

export const MenuItem = styled.div`
  ${tw`
    w-full
    flex 
    justify-between
    items-center
  `}
`;

export const ItemName = styled.div`
  ${tw`
    text-xl
    text-primary
    font-semibold
    dark:text-accent
  `}
`;
