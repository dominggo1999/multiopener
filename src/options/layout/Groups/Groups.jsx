import React, { useContext } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { ReactSortable } from 'react-sortablejs';
import {
  GroupsWrapper, Group, GroupHeader, SingleLinkInGroup,
} from './Groups.style';
import { ColHeader } from '../../atom/ColHeader';
import { AddButton } from '../../atom/Button';
import { Form } from '../../atom/InputField';
import { ListContext } from '../../context/List.context';

const Groups = () => {
  const {
    rendered,
    links,
    groups,
    addLink,
    deleteLink,
    updateLink,
    removeLinkFromGroup,
    addGroup,
    deleteGroup,
    updateGroup,
    handleSortableUpdateLinks,
    handleSortableUpdateGroups,
    handleUpdateChildren,
  } = useContext(ListContext);

  const groupsSortableOptions = {
    group: {
      name: 'groups-only',
      pull: false,
      put: false,
    },
    list: groups,
    setList: handleSortableUpdateGroups,
    animation: 200,
    className: 'groups-only',
    scroll: true,
  };

  return (
    <GroupsWrapper>
      <ColHeader>Group Links</ColHeader>
      <AddButton><AiOutlinePlus /> Add New Group</AddButton>
      <Form>
        <input
          placeholder="Search group"
          type="text"
        />
      </Form>
      <ReactSortable {...groupsSortableOptions}>
        {
          rendered && groups?.length > 0 && groups.map((group) => {
            return (
              <Group key={group.id}>
                <GroupHeader>{group.title}</GroupHeader>
                <ReactSortable
                  animation={200}
                  group={{
                    name: `groups-${group.id}`,
                    put: (to, from, dragEl, event) => {
                      for (let i = 0; i < to.el.children.length; i += 1) {
                        if (to.el.children[i].getAttribute('data-id') === dragEl.getAttribute('data-id')) {
                          return false;
                        }
                      }

                      return true;
                    },
                    pull: 'clone',
                  }}
                  list={group.children}
                  setList={(newValue) => handleUpdateChildren(group.id, newValue)}
                  scroll
                >
                  {
                        group.children?.length > 0 && group.children.map((j) => {
                          return (
                            <div key={j.id}>
                              <SingleLinkInGroup>
                                {j.link}
                              </SingleLinkInGroup>
                            </div>
                          );
                        })
                      }
                </ReactSortable>
              </Group>
            );
          })
        }
      </ReactSortable>
    </GroupsWrapper>
  );
};

export default Groups;
