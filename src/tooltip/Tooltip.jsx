/* eslint-disable no-restricted-globals */
import React, { useEffect, useState, useRef } from 'react';
import tw, { styled } from 'twin.macro';
import { isIframe } from '../util';

export const Mask = styled.div`
  ${tw`
    absolute
    z-[999]
  `}
`;

export const CoolTooltip = styled.div`
  ${tw`
    absolute
    z-[999]
  `}
  width : 50px;
  height : 50px;
  background : #007ACC;
`;

const inititalStyle = {
  width: 0,
  height: 0,
  top: 0,
  left: 0,
};

const Tooltip = () => {
  const text = useRef('');
  const [query, setQuery] = useState('');
  const rect = useRef({});
  const [style, setStyle] = useState(inititalStyle);

  const handleTextSelection = () => {
    const selection = document.getSelection && window.getSelection();
    if(selection && selection.rangeCount > 0) {
      const selectedText = selection.toString().trim();

      if(selectedText) {
        text.current = selectedText;
        setQuery(selectedText);

        const range = selection.getRangeAt(0);

        // get the text range
        rect.current = range.getBoundingClientRect();
      }else{
        text.current = '';
      }
    }
  };

  const handleFinishSelecting = () => {
    if(text.current) {
      const {
        width, height, left, top,
      } = rect.current;
      const scrollTop = window.pageYOffset || document.body.scrollTop;
      const scrollLeft = window.pageXOffset || document.body.scrollLeft;
      let tooltipTop = scrollTop + top - 50;
      const tooltipLeft = scrollLeft + left + (width / 2) - (50 / 2);

      // Move to the bottom if there is no avalaible space on the top
      if(tooltipTop < scrollTop) {
        tooltipTop = scrollTop + top + height;
      }

      setStyle({
        top: `${tooltipTop}px`,
        left: `${tooltipLeft}px`,
      });
      setQuery(text.current);
    } else{
      setStyle(inititalStyle);
    }
  };

  useEffect(() => {
    document.addEventListener('selectionchange', handleTextSelection);
    document.addEventListener('mouseup', handleFinishSelecting);

    return () => {
      document.removeEventListener('selectionchange', handleTextSelection);
      document.removeEventListener('mouseup', handleFinishSelecting);
    };
  }, []);

  const handleClick = (e) => {
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

  return (
    <>
      <CoolTooltip
        onClick={handleClick}
        style={style}
      />
    </>
  );
};

export default Tooltip;
