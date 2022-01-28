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
      bg-[#F8F8F8]
    `}
    border-radius : 5px;
  }
`;
