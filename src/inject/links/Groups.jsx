import React from 'react';
import 'twin.macro';
import { groups }from '../temp-data';
import Link from '../ui/Link';
import { getLinksInGroup, createURL } from '../../util';
import Icon from '../ui/Icon';

const Groups = ({ query }) => {
  const visitMultipleLinks = (id) => {
    const links = getLinksInGroup(id);
    const linksWithQuery = links.map((i) => {
      return createURL(query, i.link);
    });

    chrome.runtime.sendMessage({
      message: 'open group',
      links: linksWithQuery,
    });
  };

  return (
    <>
      {
        groups && groups.map((i) => {
          return (
            <li
              key={i.id}
              onClick={() => query && visitMultipleLinks(i.id)}
            >
              <Link
                href="#"
                title={i.title}
                style={{
                  pointerEvents: query ? 'auto' : 'none',
                }}
              >
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
