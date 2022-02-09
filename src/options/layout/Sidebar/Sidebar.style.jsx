import tw, { styled } from 'twin.macro';

export const SidebarWrapper = styled.div`
  ${tw`
    w-64 
    h-screen 
    overflow-hidden
    bg-background 
    absolute 
    top-0 
    left-0
    -translate-x-64
    xl:translate-x-0
    xl:static
  `}

  transition-timing-function: cubic-bezier(.4,0,.2,1);
  transition-duration: .2s;
  transition-property: transform;

  ${({ open }) => {
    return open ? tw`translate-x-0` : tw`-translate-x-64`;
  }}
`;

export const SidebarScrollArea = styled.div`
  ${tw`
    h-full 
    w-full 
    overflow-auto 
    p-4 
    text-white
  `}
`;
