import tw, { styled } from 'twin.macro';

export const SidebarWrapper = styled.aside`
  ${tw`
    w-64 
    flex 
    flex-col
    h-screen 
    overflow-hidden
    bg-primary 
    fixed 
    z-50
    top-0 
    left-0
    -translate-x-64
    xl:translate-x-0
    xl:sticky
  `}
  transition : transform 200ms cubic-bezier(.4,0,.2,1), background-color 400ms cubic-bezier(0.61, 1, 0.88, 1);;

  ${({ open }) => {
    return open ? tw`translate-x-0` : tw`-translate-x-64`;
  }}
`;

export const SidebarScrollArea = styled.nav`
  ${tw`
    h-full 
    w-full 
    overflow-auto 
    p-4 
    text-light-text
  `}
`;

export const SidebarHeader = styled.div`
  ${tw`
    flex 
    justify-between 
    items-center
    py-4
    px-8
  `}

  svg{
    ${tw`
      text-light-text
      text-2xl 
    `}
  }
`;

export const SidebarBrand = styled.div`
  ${tw`
    text-accent 
    text-2xl
    font-semibold
  `}
`;

export const NavMenu = styled.ul`
  ${tw`
    flex
    flex-col 
    overflow-x-hidden
  `}
`;

export const NavItem = styled.li`
  ${tw`
    my-2 
    text-light-text 
  `}

  a {
    ${tw`
      flex  
      gap-x-3
      items-center 
      text-lg 
      p-3
      rounded-lg 
      capitalize
    `}
  }

  a:hover, a.active{
    ${tw`
      text-accent 
      bg-secondary
      transition 
      transition-bg
      ease-out-sine
      duration-400
    `}
  }

  svg{
    ${tw`
      text-2xl
    `}
  }
`;
