import tw, { styled } from 'twin.macro';
import { MenuWrapper } from './MenuWrapper';

export const FormWrapper = styled(MenuWrapper)`
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
      transition 
      transition-bg
      ease-out-sine
      duration-400
    `}
    
    ::selection {
      ${tw`
        bg-accent 
        text-primary
      `}
    }
  }

  button[type="submit"] {
    ${tw`
      mt-10
    `}
  }
`;

export const FieldWrapper = styled.div`
  ${tw`
    mb-8 
    relative
  `}
`;

export const Label = styled.div`
  ${tw`
    text-lg
    text-primary
    dark:(text-light-text)
    mb-2
    font-semibold
  `}

  i{
    ${tw`
      font-medium
    `}
  }
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
