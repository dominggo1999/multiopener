import tw, { styled } from 'twin.macro';

export const GroupsWrapper = styled.div`
  ${tw`
    
  `}
`;

export const Group = styled.div`
  ${tw`
    p-2
    mb-2
    rounded-lg 
    bg-white
    border
    border-accent 
    shadow 
    bg-gray
  `}
`;

export const GroupHeader = styled.div`
  ${tw`
    text-xl 
    mb-2 
    px-4 
    text-white
  `}
`;

export const SingleLinkInGroup = styled.div`
  ${tw`
    flex  
    items-center 
    justify-between
    w-full 
    rounded-lg 
    bg-white
    py-3
    px-4 
    shadow 
    text-lg 
    font-semibold
    mb-2
    border
    border-accent
  `}
`;
