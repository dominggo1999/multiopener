/* eslint-disable no-restricted-globals */
import React, {
  useEffect, useState, useRef, useLayoutEffect, useMemo,
} from 'react';
import { CoolTooltip } from './Tooltip.style';
import { storageGet } from '../util';

const initialStyle = {
  width: 0,
  height: 0,
  top: -50,
  left: -50,
  display: 'none',
};

const Tooltip = () => {
  const text = useRef('');
  const tooltipRef = useRef();
  const isInput = useRef(false);
  const [query, setQuery] = useState('');
  const rect = useRef({});
  const [style, setStyle] = useState(initialStyle);
  const isIframe = window.self !== window.top;
  const [theme, setTheme] = useState();

  const getTheme = async () => {
    const storedTheme = await storageGet('theme');
    if (storedTheme) {
      setTheme(storedTheme);
    }
  };

  const handleTextSelection = async () => {
    const showTooltip = await storageGet('showTooltip');
    if (!showTooltip) return null;

    const selection = document.getSelection() && window.getSelection();

    if (selection && selection.type === 'Range' && selection.rangeCount > 0 && selection.focusNode) {
      const selectedText = selection.toString().trim();

      if (selectedText) {
        text.current = selectedText;
        setQuery(selectedText);
        const range = selection.getRangeAt(0);
        const {
          collapsed, startOffset, endOffset, endContainer,
        } = range;

        if (collapsed) {
          rect.current = endContainer.getBoundingClientRect();
          isInput.current = true;
        } else {
          rect.current = range.getBoundingClientRect();
          isInput.current = false;
        }
      } else {
        text.current = '';
      }
    } else {
      text.current = '';
      setStyle(initialStyle);
    }
  };

  const handleFinishedSelecting = async (e) => {
    const showTooltip = await storageGet('showTooltip');
    if (!showTooltip) {
      setStyle(initialStyle);
      return null;
    }

    if (e.target === tooltipRef.current) {
      setStyle(initialStyle);
      return null;
    }

    if (text.current) {
      const {
        width, height, left, top,
      } = rect.current;
      const verticalPadding = 5;
      const scrollTop = window.pageYOffset || document.body.scrollTop;
      const scrollLeft = window.pageXOffset || document.body.scrollLeft;
      let tooltipTop = scrollTop + top + height;
      let tooltipLeft = scrollLeft + left;
      const viewportHeight = window.innerHeight;

      if (!isInput.current) {
        tooltipLeft = tooltipLeft + (width / 2) - (50 / 2);
      }

      // Move to the bottom if there is no avalaible space on the top
      if (tooltipTop + 50 > scrollTop + viewportHeight) {
        tooltipTop = scrollTop + top - 50 - verticalPadding;
      }

      setStyle({
        top: `${tooltipTop}px`,
        left: `${tooltipLeft}px`,
        display: 'block',
      });
      setQuery(text.current);

      // Apply theme
      getTheme();

      // Remove tooltip in other iframes
      const allFrames = document.querySelectorAll('iframe');
      allFrames.forEach((iframe) => {
        iframe.contentWindow.postMessage('close tooltip', '*');
      });

      if (isIframe) {
        parent.window.postMessage('close tooltip', '*');
      }
    } else {
      setStyle(initialStyle);
    }
  };

  const handleCloseTooltip = (e) => {
    if (e.data === 'close tooltip') {
      setStyle(initialStyle);
    }
  };

  useEffect(() => {
    document.addEventListener('selectionchange', handleTextSelection);
    document.addEventListener('mouseup', handleFinishedSelecting);
    window.addEventListener('message', handleCloseTooltip);

    return () => {
      document.removeEventListener('selectionchange', handleTextSelection);
      document.removeEventListener('mouseup', handleFinishedSelecting);
      window.removeEventListener('message', handleCloseTooltip);
    };
  }, []);

  const handleTooltipClick = () => {
    if (query) {
      const app = document.querySelector('iframe.injected');
      if (isIframe) {
        parent.window.postMessage(
          {
            message: 'pass query',
            query,
          },
          '*',
        );
      }

      if (app && !isIframe) {
        window.parent.postMessage('update frame', '*');
        app.contentWindow.postMessage(
          {
            message: 'update query',
            query,
          },
          '*',
        );
      }
    }
  };

  useLayoutEffect(() => {
    getTheme();
  }, []);

  return useMemo(() => {
    return (
      <>
        <CoolTooltip
          className={theme}
          ref={tooltipRef}
          onClick={handleTooltipClick}
          style={{
            ...style,
          }}
        >
          <img
            src={theme && `chrome-extension://${chrome?.runtime?.id}/tooltip-icons/${theme}.png`}
            alt="Icons"
          />
        </CoolTooltip>
      </>
    );
  }, [theme, JSON.stringify(style)]);
};

export default Tooltip;
