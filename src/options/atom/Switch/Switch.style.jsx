import tw, { styled } from 'twin.macro';

export const SwitchWrapper = styled.div`
  ${tw`
    flex
    items-center
    justify-center
  `}


  .switch{
    .react-switch-bg{
      ${tw`
        bg-accent
      `}
    }
  }
`;
