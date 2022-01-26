import tw, { styled } from 'twin.macro';

export const SearchBarContainer = styled.form`
  input {
    ${tw` 
      w-full
      py-2
      px-4
      text-xl 
      font-semibold
      outline-none
    `}
    border-radius : 5px;
  }
`;
