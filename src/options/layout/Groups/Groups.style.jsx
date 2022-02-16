import tw, { styled } from 'twin.macro';

export const GroupsWrapper = styled.div`
`;

export const Group = styled.div`
  ${tw`
    p-2
    mb-2
    rounded-lg 
    bg-white
    border
    border-accent 
    shadow 
    bg-primary 
    flex
    flex-col 
    justify-center
  `}

  .sortable-ghost.sortable-chosen div{
    ${tw`
      bg-accent
      text-primary
      dark:text-primary
    `}

    svg{
      ${tw`
        dark:text-primary
      `}
    }

    button:not(:nth-child(1)){
      ${tw`
        hidden
      `}
    }
  }
`;

export const GroupHeader = styled.div`
  ${tw`
    flex
    justify-between
    text-lg
    md:text-xl 
    mb-3 
    px-2
    font-bold
    text-accent 
  `}

  ${({ empty }) => empty && tw`mb-0`}
`;

export const GroupHeaderLeft = styled.div`
  ${tw`
    flex 
    items-center
    gap-x-3
    w-1/2
    md:w-full
    text-lg
    md:text-xl 
  `}

  span:nth-child(2){
    ${tw`
      block 
      truncate
    `}
  }

  svg{
    ${tw`
      xl:mt-1 
    `}
    cursor: move; /* fallback if grab cursor is unsupported */
    cursor: grab;
  }
`;

export const GroupHeaderRight = styled.div`
  ${tw`
    flex 
    gap-x-3
  `}

  a{
    ${tw`
      mb-0
      flex
      items-center
    `}
  }

  svg{
    ${tw`
      hover:text-light-text
    `}
  }
`;
