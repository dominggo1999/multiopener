import tw, { styled } from 'twin.macro';

export const Btn = styled.button`
  ${tw`
    bg-accent 
    py-2 
    px-4
    rounded-lg 
    font-semibold
    hover:bg-accent-lighter
    text-primary
  `}
`;

export const AddButton = styled(Btn)`
  ${tw`
    flex 
    gap-2
    items-center
    px-2
    md:px-4
  `}

  svg{
    ${tw`
      text-xl
    `}
  }
`;
