import tw, { styled } from 'twin.macro';

export const FormWrapper = styled.div`
  ${tw`
    bg-white 
    flex
    w-full 
    mb-4
    rounded-xl
    max-w-2xl
    p-10
    shadow
  `}

  form{
    ${tw`
      w-full
    `}
  }


  input{
    ${tw`
      flex 
      w-full 
      border
      border-2
      py-2
      px-3
      rounded-lg
      text-lg 
      outline-none
      focus:border-accent
    `}
  }
`;

export const FieldWrapper = styled.div`
  ${tw`
    mb-4 
    relative
  `}
`;

export const Label = styled.div`
  ${tw`
    text-xl
    text-primary
    mb-2
    font-semibold
  `}
`;

export const StyledErrorMessage = styled.div`
  ${tw`
    absolute 
    w-full
    text-right
    font-medium
    text-sm
    italic
  `}
`;
