/* eslint-disable no-restricted-globals */
import React, {
  useEffect, useState, useRef, useLayoutEffect,
} from 'react';
import { BiSearch } from 'react-icons/bi';
import { CoolTooltip } from './Tooltip.style';
import { storageGet } from '../util';

const inititalStyle = {
  width: 0,
  height: 0,
  top: -50,
  left: -50,
};

const Tooltip = () => {
  const text = useRef('');
  const tooltipRef = useRef();
  const isInput = useRef(false);
  const [query, setQuery] = useState('');
  const rect = useRef({});
  const [style, setStyle] = useState(inititalStyle);
  const isIframe = window.self !== window.top;

  const handleTextSelection = (e) => {
    const selection = document.getSelection && window.getSelection();

    if(selection && selection.type === 'Range' && selection.rangeCount > 0) {
      const selectedText = selection.toString().trim();

      if(selectedText) {
        text.current = selectedText;
        setQuery(selectedText);
        const range = selection.getRangeAt(0);
        const {
          collapsed, startOffset, endOffset, endContainer,
        } = range;

        if (collapsed) {
          rect.current = endContainer.getBoundingClientRect();
          isInput.current = true;
        }else{
          rect.current = range.getBoundingClientRect();
          isInput.current = false;
        }
      }else{
        text.current = '';
      }
    }else{
      text.current = '';
    }
  };

  const handleFinishSelecting = () => {
    if(text.current) {
      const {
        width, height, left, top,
      } = rect.current;
      const scrollTop = window.pageYOffset || document.body.scrollTop;
      const scrollLeft = window.pageXOffset || document.body.scrollLeft;
      let tooltipTop = scrollTop + top + height;
      let tooltipLeft = scrollLeft + left;
      const viewportHeight = window.innerHeight;

      if(!isInput.current) {
        tooltipLeft = tooltipLeft + (width / 2) - (50 / 2);
      }

      // Move to the bottom if there is no avalaible space on the top
      if(tooltipTop + 50 > scrollTop + viewportHeight) {
        tooltipTop = scrollTop + top - 50;
      }

      setStyle({
        top: `${tooltipTop}px`,
        left: `${tooltipLeft}px`,
      });
      setQuery(text.current);

      // Remove tooltip in other iframes
      const allFrames = document.querySelectorAll('iframe');
      allFrames.forEach((iframe) => {
        iframe.contentWindow.postMessage('close tooltip', '*');
      });

      if(isIframe) {
        parent.window.postMessage('close tooltip', '*');
      }
    } else{
      setStyle(inititalStyle);
    }
  };

  const handleCloseTooltip = (e) => {
    if(e.data === 'close tooltip') {
      setStyle(inititalStyle);
    }
  };

  useEffect(() => {
    document.addEventListener('selectionchange', handleTextSelection);
    document.addEventListener('mouseup', handleFinishSelecting);
    window.addEventListener('message', handleCloseTooltip);

    return () => {
      document.removeEventListener('selectionchange', handleTextSelection);
      document.removeEventListener('mouseup', handleFinishSelecting);
      window.removeEventListener('message', handleCloseTooltip);
    };
  }, []);

  const handleTooltipClick = (e) => {
    if(query) {
      const app = document.querySelector('iframe.injected');
      if(isIframe) {
        parent.window.postMessage(
          {
            message: 'pass query',
            query,
          },
          '*',
        );
      }

      if(app && !isIframe) {
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
    const getTheme = async () => {
      const storedTheme = await storageGet('theme');
      if(storedTheme) {
        tooltipRef.current?.classList.add(storedTheme);
      }
    };

    getTheme();
  }, []);

  return (
    <>
      <CoolTooltip
        ref={tooltipRef}
        onClick={handleTooltipClick}
        style={{
          ...style,
        }}
      >
        <BiSearch />
      </CoolTooltip>
    </>
  );
};

export default Tooltip;
