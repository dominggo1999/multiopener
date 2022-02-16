import tw, { styled } from 'twin.macro';

export const SelectWrapper = styled.div`
  ${tw`
    flex
    items-center
  `}

  select{
    ${tw`
      px-2
      py-1
      bg-transparent
      text-lg
      border-2
      border-primary
      border-opacity-70
      rounded-md
      w-60
      font-semibold
      capitalize
      text-primary
      focus:border-accent

      dark:(
        text-accent
        border-accent
      ) 
    `}
  }

  option {
    ${tw`
      dark:(
        text-accent 
        bg-primary
        hover:bg-red-500
      )
    `}
  }
`;
