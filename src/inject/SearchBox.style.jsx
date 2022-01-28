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
    md:min-w-[600px]
    top-0  
    left-0
  `}
  left : 50%;
  transform : translateX(-50%);  
`;

export const SearchArea = styled.div`
  ${tw`
      my-20
      bg-[#FFFFFF]
      rounded-lg
      py-2 
      px-3
  `}


  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 10%), 0 4px 6px -4px rgb(0 0 0 / 10%);
`;

export const WebsiteList = styled.ul`
  ${tw`
    w-full 
    flex  
    flex-wrap 
    grid
    gap-x-5
    gap-y-2 
    md:grid-cols-3 
    mb-5
  `}
`;

export const TypeTitle = styled.h3`
  ${tw`
    text-2xl
    mt-3 
    text-black
    mb-2
  `}
`;
