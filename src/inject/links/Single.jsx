/* eslint-disable no-script-url */
import React from 'react';
import { links }from '../temp-data';
import Link from '../ui/Link';
import 'twin.macro';
import { createURL } from '../../util';
import Icon from '../ui/Icon';

const Single = ({ query }) => {
  return (
    <>
      {
        links && links.map((i) => {
          const url = createURL(query, i.link);
          const domainAndSubdomain = /^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i;
          const domain = domainAndSubdomain.exec(i.link)[1];

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
