/* eslint-disable no-script-url */
import React from 'react';
import Link from '../ui/Link';
import 'twin.macro';
import { createURL, getDomainAndSubDomain } from '../../util';
import Icon from '../ui/Icon';
import Key from '../ui/Key';

const Single = ({
  query, links, singleKeys, keyMode, mode, handleClose,
}) => {
  return (
    <>
      {
        links && links.length > 0 && links.map((i, id) => {
          const url = createURL(query, i.link);
          const { domain, homepage } = getDomainAndSubDomain(i.link);
          const key = singleKeys[id];

          return (
            <li
              key={i.link}
            >
              <Link
                target="_blank"
                href={query ? url : homepage}
                title={i.title}
                onClick={handleClose}
              >
                <Key
                  mode={mode}
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
