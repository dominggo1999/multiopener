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

export const NavMenu = styled.ul`
  ${tw`
    
  `}
`;

export const NavItem = styled.li`
  ${tw`
    my-2 
    text-white 
  `}

  a {
    ${tw`
      flex  
      gap-x-3
      items-center 
      text-lg 
      p-3
      rounded-lg
    `}
  }

  a:hover, a.active{
    ${tw`
      text-accent 
      bg-gray
    `}
  }

  svg{
    ${tw`
      text-2xl
    `}
  }
`;
