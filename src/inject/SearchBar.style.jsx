import tw, { styled } from 'twin.macro';

export const SearchBarContainer = styled.form`
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
      font-semibold
      outline-none 
      bg-main-light
      rounded-2xl
    `}
    border-radius : 5px;
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
    bg-white
    rounded-lg
    font-bold
    text-key-tuts-active
    select-none
    text-sm
  `}

  box-shadow: rgba(49, 50, 51, 0.39) 0px 1px 2px 0px, rgba(54, 54, 54, 0.15) 0px 2px 6px 2px;
`;
