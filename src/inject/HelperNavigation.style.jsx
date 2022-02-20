import tw, { styled } from 'twin.macro';

export const HelperNavigationWrapper = styled.div`
  ${tw`
    flex 
    flex-wrap
    w-full
    pt-2
    gap-x-8
    justify-end
  `}
`;

export const Link = styled.button`
  ${tw`
    dark:(text-accent)
    dark:hover:text-light-text
    font-semibold
    hover:text-accent
    text-sm
    text-primary
  `}
`;
