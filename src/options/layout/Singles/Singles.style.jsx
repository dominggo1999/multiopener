import tw, { styled } from 'twin.macro';

export const SinglesWrapper = styled.div`
  .sortable-ghost.sortable-chosen div{
    ${tw`
      bg-accent
      text-light-text
      dark:text-primary
    `}

  svg{
    ${tw`
        dark:text-primary
      `}
    }
  }
`;
