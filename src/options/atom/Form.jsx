import tw, { styled } from 'twin.macro';

export const FormWrapper = styled.div`
  ${tw`
    bg-white 
    dark:(bg-primary shadow-none)
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
      border-primary
      border-opacity-50
      py-2
      px-3
      rounded-lg
      text-lg 
      outline-none
      focus:(border-accent border-opacity-100)
      font-medium
      dark:(bg-primary text-light-text border-light-text focus:border-accent caret-accent border-opacity-60)
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
    dark:(text-light-text)
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
    dark:(text-light-text)
    italic
  `}
`;
