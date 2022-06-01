import React, { useEffect } from 'react';
import { storageSet, storageGet } from '../util';

const settings = [
  {
    key: 'links',
    default: [],
  },
  {
    key: 'groups',
    default: [],
  },
  {
    key: 'theme',
    default: 'blue-origin',
  },
  {
    key: 'mode',
    default: 'light',
  },
  {
    key: 'showTooltip',
    default: true,
  },
];

const useWebStorage = () => {
  // Only use localStorage on standalone website
  if (chrome?.runtime) return null;

  useEffect(() => {
    settings.forEach(async (i) => {
      const val = await storageGet(i.key);
      if (val === null || val === undefined) {
        storageSet(i.key, i.default);
      }
    });
  }, []);

  return null;
};

export default useWebStorage;
