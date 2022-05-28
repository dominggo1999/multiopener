import React, { useContext, useLayoutEffect, useRef } from 'react';
import { PopupWrapper, Button } from './Popup.style';
import { storageSet, storageGet, openOptionsURL } from '../util';
import { ThemeContext } from '../theme/ThemeProvider';

const Popup = () => {
  const { theme } = useContext(ThemeContext);
  const toggleRef = useRef();

  const replaceButtonText = (show) => {
    if (show) {
      toggleRef.current.innerText = 'Disable Tooltip';
      toggleRef.current.classList.remove('inactive');
    } else {
      toggleRef.current.classList.add('inactive');
      toggleRef.current.innerText = 'Enable Tooltip';
    }
  };

  const toggleTooltip = async () => {
    const showTooltip = await storageGet('showTooltip');
    replaceButtonText(!showTooltip);
    storageSet('showTooltip', !showTooltip);
  };

  useLayoutEffect(() => {
    (async () => {
      const showTooltip = await storageGet('showTooltip');
      replaceButtonText(showTooltip);
    })();
  }, []);

  return (
    <PopupWrapper className={theme}>
      <Button
        ref={toggleRef}
        onClick={toggleTooltip}
      />
      <Button
        onClick={() => openOptionsURL(`chrome-extension://${chrome?.runtime?.id}/dist/options/index.html#`)}
      >
        Options
      </Button>
      <Button
        as="a"
        href="https://github.com/dominggo1999/multiopener"
        target="_blank"
        rel="noopener noreferrer"
      >
        Documentation
      </Button>
    </PopupWrapper>
  );
};

export default Popup;
