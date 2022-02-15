/* eslint-disable no-script-url */
import React from 'react';
import Link from '../ui/Link';
import 'twin.macro';
import { createURL, getDomainAndSubDomain } from '../../util';
import Icon from '../ui/Icon';
import Key from '../ui/Key';

const Single = ({
  query, links, singleKeys, keyMode,
}) => {
  return (
    <>
      {
        links && links.length > 0 && links.map((i, id) => {
          const url = createURL(query, i.link);
          const domain = getDomainAndSubDomain(i.link);
          const key = singleKeys[id];

          return (
            <li
              key={i.link}
            >
              <Link
                target={query ? '_blank' : '_self'}
                href={query ? url : '#'}
                title={i.title}
                style={{
                  pointerEvents: query ? 'auto' : 'none',
                }}
              >
                <Key
                  keyMode={keyMode}
                  char={key}
                />

                <Icon domain={domain} />
              </Link>
            </li>
          );
        })
      }
    </>
  );
};

export default Single;
