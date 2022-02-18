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
    const selectedTheme = e.value;

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
          Select themes
        </ItemName>
        <Select
          value={theme}
          options={themes}
          labelKey="name"
          valueKey="name"
          handleChange={changeTheme}
          name="theme-picker"
          isSearchable
        />
      </MenuItem>
    </ThemeMenuWrapper>
  );
};

export default Theme;
