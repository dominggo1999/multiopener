import React, { useContext } from 'react';
import { AiOutlinePlus, AiOutlineEdit } from 'react-icons/ai';
import { ReactSortable } from 'react-sortablejs';
import { FaArrowsAlt } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import {
  GroupsWrapper, Group, GroupHeader as StyledHeader,
  GroupHeaderLeft, GroupHeaderRight,
} from './Groups.style';
import { ColHeader } from '../../atom/ColHeader';
import { AddButton } from '../../atom/Button';
import { Form } from '../../atom/InputField';
import { ListContext } from '../../context/List.context';
import SingleLinkInGroup from '../../atom/SingleLinkInGroup';

const GroupHeader = ({ title, empty, deleteGroup }) => {
  return (
    <StyledHeader empty={empty}>
      <GroupHeaderLeft>
        <span className="group-handle">
          <FaArrowsAlt />
        </span>
        <span>
          {title}
        </span>
      </GroupHeaderLeft>

      {/* Group Actions */}
      <GroupHeaderRight>
        <button onClick={deleteGroup}>
          <RiDeleteBin6Line />
        </button>
        <button>
          <AiOutlineEdit />
        </button>
      </GroupHeaderRight>
    </StyledHeader>
  );
};

const Groups = () => {
  const {
    rendered,
    groups,
    handleSortableUpdateGroups,
    handleUpdateChildren,
    deleteGroup,
    removeLinkFromGroup,
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
    handle: '.group-handle',
    forceFallback: true,
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
              <div key={group.id}>
                <Group>
                  <GroupHeader
                    empty={group.children.length === 0}
                    title={group.title}
                    deleteGroup={() => deleteGroup(group.id)}
                  />
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
                    forceFallback
                  >
                    {
                        group.children?.length > 0 && group.children.map((j) => {
                          return (
                            <div key={j.id}>
                              <SingleLinkInGroup
                                removeLink={() => removeLinkFromGroup(group.id, j.id)}
                                title={j.link}
                              />
                            </div>
                          );
                        })
                      }
                  </ReactSortable>
                </Group>
              </div>
            );
          })
        }
      </ReactSortable>
    </GroupsWrapper>
  );
};

export default Groups;
