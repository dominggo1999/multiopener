import React from 'react';
import 'twin.macro';
import { groups }from '../temp-data';
import Link from '../ui/Link';
import { getLinksInGroup, createURL } from '../../util';

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
              tw="w-1/3"
              key={i.id}
              onClick={() => query && visitMultipleLinks(i.id)}
            >
              <Link
                href="#"
                title={i.title}
              />
            </li>
          );
        })
      }
    </>
  );
};

export default Groups;
