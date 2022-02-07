import tw, { styled } from 'twin.macro';

export const Container = styled.div`
  ${tw`
    w-full
    h-screen 
    flex
    justify-between
  `}
`;

export const Box = styled.div`
  ${tw`
    w-[45%]
    bg-red-500 
  `}
  .group-links{
    ${tw`
      bg-blue-500
    `}
  }
  li{
    ${tw`
      px-2
      py-1
      bg-blue-500 
      select-none 
      flex 
      justify-between  
      w-full
    `}
    button {
      ${tw`
        cursor-pointer
      `}
    }
  }
  .links-only{
    div{
      ${tw`
        bg-blue-500 
        py-1 
        select-none  
        w-full 
        flex
        justify-between 
        px-4
      `}
    }
  }
  .groups-only{
    .header{
      ${tw`
        text-white
        bg-green-500 
        px-2  
        flex
        justify-between
        py-2
      `}
    }
  }
  .accordion__button{
    ${tw`
      p-0 
      bg-transparent
    `}
  }
  .group-item{
    ${tw`
      h-[0px]
      overflow-hidden
    `}
    transition : height ease-in 200ms; 
  }
  .group-item.show{
    ${tw`
      h-full
      overflow-visible
    `}
    transition : height ease-in 200ms; 
  }
  
`;
