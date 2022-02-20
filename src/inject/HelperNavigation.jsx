import React from 'react';
import { HelperNavigationWrapper, Link } from './HelperNavigation.style';
import { messageToBackground } from '../util';

const paths = [
  {
    id: 'addLinks',
    path: '/',
    name: 'Add Link',
  },
  {
    id: 'settings',
    path: '/settings',
    name: 'Settings',
  },
  {
    id: 'theme',
    path: '/theme',
    name: 'Theme',
  },
];

const createURL = (paths) => {
  const extensionID = chrome?.runtime?.id || 'oapkkehbjlgjpicmdeajiikpcnlgdeec';

  const baseURL = `chrome-extension://${extensionID}/dist/options/index.html`;

  return paths.map((p) => {
    return {
      id: p.id,
      name: p.name,
      url: chrome?.runtime?.id ? baseURL + p.path.replace('/', '#') : '#',
    };
  });
};

const helperLinks = createURL(paths);

const openOptionsURL = (url) => {
  messageToBackground({
    message: 'open options page',
    url,
  });
};

const HelperNavigation = () => {
  return (
    <HelperNavigationWrapper>
      {
        helperLinks?.length > 0 && helperLinks.map((i) => {
          return (
            <Link
              onClick={() => openOptionsURL(i.url)}
              key={`helper-link${i.id}`}
            >
              {i.name}
            </Link>
          );
        })
      }
    </HelperNavigationWrapper>
  );
};

export default HelperNavigation;
