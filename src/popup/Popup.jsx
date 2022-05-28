import React from 'react';
import { Box } from './Popup.style';
import { storageSet, storageGet } from '../util';

const Popup = () => {
  const toggleTooltip = async () => {
    const showTooltip = await storageGet('showTooltip');

    storageSet('showTooltip', !showTooltip);
  };

  return (
    <Box>
      <button onClick={toggleTooltip}>Toggle Tooltip</button>
    </Box>
  );
};

export default Popup;
