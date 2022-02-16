import React, { useContext } from 'react';
import { MenuItem, ItemName } from '../../atom/MenuItem';
import Switch from '../../atom/Switch/Switch';
import Select from '../../atom/Select/Select';
import { ThemeContext } from '../../../theme/ThemeProvider';
import { themes } from '../../../theme/themes';
import { ThemeMenuWrapper } from './Theme.style';

const Theme = () => {
  const {
    theme, setTheme, setMode, mode,
  } = useContext(ThemeContext);
  const isDark = mode === 'dark';

  const changeMode = () => {
    setMode((prevMode) => {
      return prevMode === 'light' ? 'dark' : 'light';
    });
  };

  const changeTheme = (e) => {
    const selectedTheme = e.target.value;

    setTheme(selectedTheme);
  };

  return (
    <ThemeMenuWrapper>
      <MenuItem>
        <ItemName>
          Dark mode
        </ItemName>
        <Switch
          handleChange={changeMode}
          checked={isDark}
        />
      </MenuItem>
      <MenuItem>
        <ItemName>
          Select theme
        </ItemName>
        <Select
          value={theme}
          name="theme-picker"
          selectId="theme-picker"
          options={themes}
          title="name"
          optionKey="name"
          handleChange={changeTheme}
        />
      </MenuItem>
    </ThemeMenuWrapper>
  );
};

export default Theme;
