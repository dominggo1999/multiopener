/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React from 'react';
import 'twin.macro';
import { GroupLink } from '../ui/Link';
import { createURL } from '../../util';
import Icon from '../ui/Icon';
import Key from '../ui/Key';

const Groups = ({
  query, groups, groupKeys, keyMode,
}) => {
  const visitMultipleLinks = (id) => {
    const target = groups.filter((group) => group.id === id)[0];

    const links = target.children;

    const linksWithQuery = links.map((i) => {
      return createURL(query, i.link);
    });

    chrome.runtime?.sendMessage({
      message: 'open group',
      links: linksWithQuery,
    });
  };

  return (
    <>
      {
        groups && groups.length > 0 && groups.map((i, id) => {
          const key = groupKeys[id];
          return (
            <li
              key={i.id}
            >
              <GroupLink
                onClick={() => query && visitMultipleLinks(i.id)}
                title={i.name}
                style={{
                  pointerEvents: query ? 'auto' : 'none',
                }}
              >
                <Key
                  keyMode={keyMode}
                  char={key !== 1 && key}
                />
                <Icon />
              </GroupLink>
            </li>
          );
        })
      }
    </>
  );
};

export default Groups;
