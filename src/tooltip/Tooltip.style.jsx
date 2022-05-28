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
    rounded-full
    bg-[#2DD4BF]
    mt-1 
  `}

  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  top:-50px;
  left:-50px;
  width : 50px;
  height : 50px;

  svg{
    ${tw`
      text-[#0F172A] 
      text-3xl     
      pointer-events-none
    `}
  }
`;
