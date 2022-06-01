import React, { useLayoutEffect, useState } from 'react';
import { SettingsWrapper } from './Settings.style';
import Switch from '../../atom/Switch/Switch';
import { MenuItem, ItemName } from '../../atom/MenuItem';
import { storageGet, storageSet } from '../../../util';

const Settings = () => {
  const [show, setShow] = useState(true);

  useLayoutEffect(() => {
    const getStore = async () => {
      const showTooltip = await storageGet('showTooltip');
      setShow(showTooltip);
    };

    getStore();

    window.addEventListener('focus', getStore);

    return () => {
      window.removeEventListener('focus', getStore);
    };
  }, []);

  const changeShowTooltip = async () => {
    setShow(!show);
    await storageSet('showTooltip', !show);
  };

  return (
    <SettingsWrapper>
      <MenuItem>
        <ItemName>
          Show tooltip
        </ItemName>
        <Switch
          handleChange={changeShowTooltip}
          checked={show}
        />
      </MenuItem>
    </SettingsWrapper>
  );
};

export default Settings;
