import React, { useContext } from 'react';
import rgbHex from 'rgb-hex';
import S from 'react-switch';
import { SwitchWrapper } from './Switch.style';
import { ThemeContext } from '../../../theme/ThemeProvider';
import { themes } from '../../../theme/themes';

// Reason for this line  : https://github.com/vitejs/vite/issues/2139#issuecomment-802981228
const ReactSwitch = S.default ? S.default : S;

const Switch = ({ checked, handleChange }) => {
  const { theme } = useContext(ThemeContext);

  const targetId = themes.map((i) => i.name).indexOf(theme);

  console.log(theme, targetId);

  const {
    accent,
    accentLighter,
    secondary,
    mainBackground,
  } = themes[targetId].colors;

  const activeColor = rgbHex(`rgb(${accent})`);
  const disabledColor = rgbHex(`rgb(${secondary})`);
  const offHandle = rgbHex(`rgb(${mainBackground})`);

  return (
    <SwitchWrapper>
      <ReactSwitch
        checked={checked}
        onChange={handleChange}
        uncheckedIcon={false}
        checkedIcon={false}
        className="switch"
        onColor={`#${activeColor}`}
        offColor={`#${disabledColor}`}
        offHandleColor={`#${offHandle}`}
        activeBoxShadow={`0px 0px 0px 12px rgba(${accentLighter}, 0.5)`}
        boxShadow="0px 1px 5px 1px rgba(0, 0, 0, 0.562)"
      />
    </SwitchWrapper>
  );
};

export default Switch;
