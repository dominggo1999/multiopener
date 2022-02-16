import tw, { styled } from 'twin.macro';
import { MenuWrapper } from '../../atom/MenuWrapper';

export const ThemeMenuWrapper = styled(MenuWrapper)`
  ${tw`
    flex-col
    gap-y-6
  `}
`;
