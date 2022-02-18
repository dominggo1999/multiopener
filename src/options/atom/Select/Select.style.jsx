import tw, { styled } from 'twin.macro';

export const SingleSelectWrapper = styled.div`
  ${tw`
    flex
    items-center
  `}

  .react-select-container{
    ${tw`
      w-56
    `}
  }
  
  /* If searchable */
  .react-select__input-container{
    ${tw`
      font-semibold
      text-primary
      dark:(text-light-text)
    `}
  }

  .react-select__control{
    ${tw`
      bg-transparent 
      shadow-none
      border-2
      border-primary
      border-opacity-40
      hover:(border-primary border-opacity-40)
      dark:(border-opacity-100 border-accent)
      dark:hover:(border-accent)
    `}
  }

  .react-select__control--is-focused{
    ${tw`
      border-accent
      hover:border-accent
    `}

    /* arrow */
    .react-select__indicators svg{
      ${tw`
        text-accent
        opacity-100
      `}
    }
  }

  /* Shown value */
  .react-select__single-value{
    ${tw`
      text-primary 
      capitalize
      font-medium
      dark:text-accent
    `}
  }

  /* line between option and arrow */
  .react-select__indicator-separator{
    display: none;
  }

  /* Arrow */
  .react-select__indicators svg{
    ${tw`
      fill-current 
      text-primary
      dark:text-accent
      opacity-40
    `} 
  }

  /* Items */
  .react-select__menu{
    ${tw`
      overflow-hidden
      border-2
      border-accent
      dark:(
        bg-primary
      )
    `}
  }

  .react-select__menu-list{
    ${tw`
      p-0
    `}
  }

  .react-select__option{
    ${tw`
      dark:(
        bg-none
        text-accent
      )
      dark:hover:(
        bg-accent
        text-primary
      )

      hover:(bg-accent text-primary)
      font-medium
      capitalize
    `}
  }

  .react-select__option--is-focused{
    ${tw`
      dark:(
        bg-accent-lighter
        text-primary
      )

      bg-accent-lighter
      text-primary
    `}

  }

  .react-select__option--is-selected{
    ${tw`
      dark:(
        bg-accent
        text-primary
      )
      bg-accent
      text-primary
    `}
  }

  /* No options */
  .react-select__menu-notice.react-select__menu-notice--no-options{
    ${tw`
      text-primary 
      dark:text-accent
    `}
  }
`;

export const MultiSelectWrapper = styled(SingleSelectWrapper)`
   ${tw`
    w-full
  `}

  .react-select-container{
    ${tw`
      w-full
    `}
  }

  .react-select__control{
    ${tw`
      hover:(border-primary border-opacity-50)
      dark:(border-light-text border-opacity-60)
      dark:hover:(border-light-text border-opacity-60)
      border-primary
      border-opacity-50
    `}
  }

  .react-select__control--is-focused {
    ${tw`
      border-accent
      dark:(border-accent)   
      hover:(border-accent)
      dark:hover:(border-accent)
    `}

    /* arrow */
    .react-select__indicators svg{
      ${tw`
        text-accent
        opacity-100
      `}
    }
  }

  .react-select__multi-value{
    ${tw`
      bg-accent
      text-primary
      capitalize
      font-semibold
    `}
  }

  .react-select__multi-value__label{
    ${tw`
      text-primary
    `}
  }

  .react-select__multi-value__remove{
    ${tw`
      hover:(bg-primary text-light-text)
      dark:hover:(bg-accent-lighter text-primary)
    `}

    &:hover svg{
      transform : scale(1.4) rotate(180deg);
      transition : transform ease-in-out 200ms;
    }
  }
`;
