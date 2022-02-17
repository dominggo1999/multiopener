import tw, { styled } from 'twin.macro';

export const SelectWrapper = styled.div`
  ${tw`
    flex
    items-center
  `}

  .react-select-container{
    ${tw`
      w-56
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
`;
