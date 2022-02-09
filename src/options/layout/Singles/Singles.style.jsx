import tw, { styled } from 'twin.macro';

export const SinglesWrapper = styled.div`
  .sortable-ghost.sortable-chosen div{
    ${tw`
      bg-accent
    `}
  }

  .sortable-drag{
    opacity : 0.5 !important;
    transform : rotate(-5deg);
  }
`;
