/* eslint-disable no-script-url */
import React from 'react';
import { links }from '../temp-data';
import Link from '../ui/Link';
import 'twin.macro';
import { createURL } from '../../util';

const Single = ({ query }) => {
  return (
    <>
      {
        links && links.map((i) => {
          const url = createURL(query, i.link);

          return (
            <li
              tw="w-1/3"
              key={i.link}
            >
              <Link
                target={query ? '_blank' : '_self'}
                href={query ? url : '#'}
                title={i.title}
                style={{
                  pointerEvents: query ? 'auto' : 'none',
                }}
              />
            </li>
          );
        })
      }
    </>
  );
};

export default Single;
