import React, { useEffect, useState, useRef } from 'react';
import tw, { styled } from 'twin.macro';

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

      setStyle({
        top: `${scrollTop + top - 50}px`,
        left: `${scrollLeft + left + (width / 2) - (50 / 2)}px`,
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
      if(app) {
        window.parent.postMessage('update frame', '*');
        app.contentWindow.postMessage(
          {
            message: 'unmount react',
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
