import React, { useEffect } from 'react';
import { useLocation, matchPath } from 'react-router-dom';

const routeTitles = [
  {
    path: '/',
    title: 'links',
  },
  {
    path: '/settings',
    title: 'settings',
  },
  {
    path: '/theme',
    title: 'theme',
  },
  {
    path: '/search',
    title: 'search',
  },
  {
    path: '/add-new-link',
    title: 'add new link',
  },
  {
    path: '/add-new-group',
    title: 'add new group',
  },
  {
    path: '/edit-link/:linkId',
    title: 'edit link',
  },
  {
    path: '/edit-group/:groupId',
    title: 'edit group',
  },
];

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const useHeader = () => {
  const { pathname } = useLocation();

  // Find title
  const getTitle = (pathname) => {
    const matches = routeTitles.filter((i) => {
      return matchPath(pathname, {
        path: i.path,
        exact: true,
      });
    });

    return matches[0] ? matches[0].title : 'not found';
  };

  const title = getTitle(pathname);

  useEffect(() => {
    document.title = `Options | ${capitalizeFirstLetter(title)}`;
  }, [title]);

  return { title };
};

export default useHeader;
