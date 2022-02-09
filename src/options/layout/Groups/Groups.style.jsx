import tw, { styled } from 'twin.macro';

export const GroupsWrapper = styled.div`
  ${tw`
    
  `}
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
    bg-gray 
    flex
    flex-col 
    justify-center
  `}

  .sortable-ghost.sortable-chosen div{
    ${tw`
      bg-accent
    `}

    button:nth-child(2){
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
    text-xl 
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
  `}

  svg{
    ${tw`
      mt-1 
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

  svg{
    ${tw`
      hover:text-white
    `}
  }
`;
