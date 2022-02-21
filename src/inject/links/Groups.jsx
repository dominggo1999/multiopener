/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React from 'react';
import 'twin.macro';
import Link from '../ui/Link';
import { createURL } from '../../util';
import Icon from '../ui/Icon';
import Key from '../ui/Key';

const Groups = ({
  query, groups, groupKeys, keyMode, mode, embedded,
}) => {
  const visitMultipleLinks = (id) => {
    const target = groups.filter((group) => group.id === id)[0];

    const links = target.children;

    const targetLinks = links.map((i) => {
      return createURL(query, i.link);
    });

    if(chrome.runtime?.id) {
      chrome.runtime.sendMessage({
        message: 'open group',
        links: targetLinks,
      });
    }

    if(embedded && !chrome.runtime.id) {
      console.log('failed');
      for (let i = 0; i < targetLinks.length; i += 1) {
        window.open(targetLinks[i]);
      }
    }
  };

  return (
    <>
      {
        groups && groups.length > 0 && groups.map((i, id) => {
          const key = groupKeys[id];

          // Only render groups that have children
          if(!i.children.length) return null;

          return (
            <li
              key={i.id}
            >
              <Link
                as="button"
                onClick={() => visitMultipleLinks(i.id)}
                title={i.name}
              >
                <Key
                  keyMode={keyMode}
                  char={key}
                  mode={mode}
                />
                <Icon />
              </Link>
            </li>
          );
        })
      }
    </>
  );
};

export default Groups;
