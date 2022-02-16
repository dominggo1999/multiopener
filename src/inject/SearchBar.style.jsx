import tw, { styled } from 'twin.macro';

export const SearchBarContainer = styled.div`
  ${tw`
    relative
  `}

  input {
    ${tw` 
      w-full
      py-3
      pl-4
      pr-24
      text-xl 
      font-medium
      outline-none 
      border
      border-transparent
      bg-main-background
      dark:(bg-transparent caret-accent text-light-text border-accent)
      rounded-2xl
    `}
    border-radius : 5px;

    ::selection {
      ${tw`
        bg-accent 
        text-primary
      `}
    }
  }
`;
export const EscapeKeyWrapper = styled.span`
  ${tw`
    absolute
    right-0
    top-0
    h-full 
    flex
    items-center
    pr-4
  `}
`;

export const EscapeKeyChar = styled.button`
  ${tw`
    py-2
    px-3
    border
    border-transparent
    bg-primary
    dark:(border-accent shadow-none hover:bg-accent hover:text-primary)
    rounded-lg
    font-bold
    text-accent
    select-none
  `}

  box-shadow: rgba(49, 50, 51, 0.39) 0px 1px 2px 0px, rgba(54, 54, 54, 0.15) 0px 2px 6px 2px;
`;
