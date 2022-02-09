import React, { useContext } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { ReactSortable } from 'react-sortablejs';
import { ColHeader } from '../../atom/ColHeader';
import { AddButton } from '../../atom/Button';
import { Form } from '../../atom/InputField';
import SingleLink from '../../atom/SingleLink';
import { ListContext } from '../../context/List.context';
import { SinglesWrapper } from './Singles.style';

const Singles = () => {
  const {
    links,
    deleteLink,
    handleSortableUpdateLinks,
  } = useContext(ListContext);

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
    forceFallback: true,
  };

  return (
    <SinglesWrapper>
      <ColHeader>Single Links</ColHeader>
      <AddButton><AiOutlinePlus /> Add New Link</AddButton>
      <ReactSortable {...linksSortableOptions}>
        {links.length > 0 && links.map((item) => (
          <div key={item.id}>
            <SingleLink
              deleteLink={deleteLink}
              title={item.link}
              id={item.id}
            />
          </div>
        ))}
      </ReactSortable>
    </SinglesWrapper>
  );
};

export default Singles;
