import React, { useContext, useEffect, useRef } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { ReactSortable } from 'react-sortablejs';
import { gsap } from 'gsap';
import { ColHeader } from '../../atom/ColHeader';
import { AddButton } from '../../atom/Button';
import SingleLink from '../../atom/SingleLink';
import { ListContext } from '../../../context/List.context';
import { SinglesWrapper } from './Singles.style';
import Link from '../../atom/RouterLink';

const Singles = () => {
  const {
    rendered,
    links,
    deleteLink,
    handleSortableUpdateLinks,
  } = useContext(ListContext) || {};
  const linksSortableRef = useRef();

  const linksSortableOptions = {
    className: 'links-only',
    group: {
      name: 'links-only',
      pull: 'clone',
      put: false,
    },
    animation: 200,
    list: links,
    setList: handleSortableUpdateLinks,
  };

  return (
    <SinglesWrapper
      ref={linksSortableRef}
    >
      <ColHeader>Single Links</ColHeader>
      <Link to="add-new-link">
        <AddButton><AiOutlinePlus /> Add New Link</AddButton>
      </Link>
      <ReactSortable
        {...linksSortableOptions}
      >
        {links?.length > 0 && links.map((item) => (
          <div key={item.id}>
            <SingleLink
              deleteLink={deleteLink}
              link={item.link}
              title={item.title}
              id={item.id}
            />
          </div>
        ))}
      </ReactSortable>
    </SinglesWrapper>
  );
};

export default Singles;
