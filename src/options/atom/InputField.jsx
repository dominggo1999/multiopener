import tw, { styled } from 'twin.macro';

export const Form = styled.form`
  ${tw`
    flex
    w-full 
    mb-4
  `}

  input{
    ${tw`
      w-1/2 
      border-2
      rounded-lg 
      py-2 
      px-4
      focus:border-accent
      outline-none 
      text-lg
    `}
  }
`;
