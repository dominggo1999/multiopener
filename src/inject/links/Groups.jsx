/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React from 'react';
import 'twin.macro';
import Link from '../ui/Link';
import { createURL } from '../../util';
import Icon from '../ui/Icon';
import Key from '../ui/Key';

const Groups = ({
  query, groups, groupKeys, keyMode, mode, embedded, handleClose,
}) => {
  const visitMultipleLinks = async (id) => {
    const target = groups.filter((group) => group.id === id)[0];

    const links = target.children;

    const targetLinks = links.map((i) => {
      return createURL(query, i.link);
    });

    if(chrome.runtime?.id) {
      try {
        const res = await chrome.runtime.sendMessage({
          message: 'open group',
          links: targetLinks,
        });
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }

    if(embedded && !chrome.runtime.id) {
      console.log('failed');
      for (let i = 0; i < targetLinks.length; i += 1) {
        window.open(targetLinks[i]);
      }
    }

    handleClose();
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
