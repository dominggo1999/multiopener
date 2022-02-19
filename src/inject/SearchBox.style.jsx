import tw, { styled } from 'twin.macro';

export const Overlay = styled.div`
  ${tw`
    w-full 
    h-[100%]
    top-0 
    left-0  
    fixed 
  `}
  background : rgba(0,0,0,.7);
`;

export const SearchAreaWrapper = styled.div`
  ${tw`
    min-w-[90%]
    absolute  
    md:min-w-[750px]
    top-0  
    left-1/2
    -translate-x-1/2
  `}

  ${({ embedded }) => embedded && tw`
    static
    translate-x-0
    max-w-[750px]
    mx-auto
  `}
`;

export const SearchArea = styled.div`
  ${tw`
      my-20
      bg-white
      dark:(bg-primary)
      rounded-lg
      py-5 
      px-6
  `}


  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 10%), 0 4px 6px -4px rgb(0 0 0 / 10%);
  transition: background-color 300ms ease-in-out;
  ${({ embedded }) => embedded && tw`
    my-0
  `}
`;

export const WebsiteList = styled.ul`
  ${tw`
    w-full 
    flex  
    flex-wrap 
    grid
    gap-x-5
    gap-y-3 
    md:grid-cols-3 
    mb-5
  `}
`;

export const TypeTitle = styled.h3`
  ${tw`
    text-xl
    mb-2 
    text-primary
    dark:(text-light-text)
  `}
`;
