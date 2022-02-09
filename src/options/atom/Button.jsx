import tw, { styled } from 'twin.macro';

export const Btn = styled.button`
  ${tw`
    bg-accent 
    py-2 
    px-4
    rounded-lg 
    font-semibold
    hover:bg-[#44ebd4]
    text-gray
  `}
`;

export const AddButton = styled(Btn)`
  ${tw`
    flex 
    gap-2
    items-center
    mb-4
  `}

  svg{
    ${tw`
      text-xl
    `}
  }
`;
