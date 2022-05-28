import tw, { styled } from 'twin.macro';

export const PopupWrapper = styled.div`
  ${tw`
    w-[200px] 
    flex 
    flex-col 
    p-4
  `}
`;

export const Button = styled.button`
  ${tw` 
    self-center
    px-4
    py-1
    text-accent 
    rounded-lg
    bg-primary 
    font-semibold 
    border-primary
    text-sm
    w-[140px] 
    border-primary
    border-2 
    mb-2 
    text-center
  `}

  &.inactive{
    ${tw`
      text-primary
      bg-transparent
    `}
  }

  &:nth-last-child(1){
    ${tw`
      mb-0
    `}
  }
`;
