import tw, { styled } from 'twin.macro';

export const Mask = styled.div`
  ${tw`
    absolute
    z-[999]
  `}
`;

export const CoolTooltip = styled.button`
  ${tw`
    flex 
    items-center 
    justify-center
    absolute
    z-[2147483644]
    mt-1 
    border-none 
    rounded-full
    cursor-pointer
  `}

  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px !important;
  top:-50px;
  left:-50px;
  width : 50px !important;
  height : 50px !important;
  min-width: 50px !important;
  min-height: 50px !important;
  transition: 0 !important;
  box-shadow: none !important;
  background-color: transparent !important;
  padding : 0 !important;
  margin : 0 !important;

  &:hover{
    background-color: transparent !important;
  }

  img{
    width : 50px !important;
    height : 50px !important;
    max-width: 50px !important;
    max-height: 50px !important;
    ${tw`
      pointer-events-none
    `}
  }
`;
