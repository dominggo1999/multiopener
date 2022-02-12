import tw, { styled } from 'twin.macro';

export const SearchBarContainer = styled.form`
  input {
    ${tw` 
      w-full
      py-3
      px-4
      text-xl 
      font-semibold
      outline-none 
      bg-main-light
      rounded-2xl
    `}
    border-radius : 5px;
  }
`;
