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
    md:min-w-[700px]
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
      py-5 
      px-10
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
    gap-y-3 
    md:grid-cols-3 
    mb-5
  `}
`;

export const TypeTitle = styled.h3`
  ${tw`
    text-2xl
    mt-3 
    mb-2 
    font-semibold 
    text-[#11494d] 
  `}
`;
