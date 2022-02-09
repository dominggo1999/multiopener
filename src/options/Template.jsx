import React, { useRef } from 'react';
import { ReactSortable } from 'react-sortablejs';
import tw, { styled } from 'twin.macro';
import uesLists from '../hooks/useLists';

export const Container = styled.div`
  ${tw`
    w-full
    h-screen 
    flex
    justify-between
  `}
`;

export const Box = styled.div`
  ${tw`
    w-[45%]
    bg-red-500 
  `}
  .group-links{
    ${tw`
      bg-blue-500
    `}
  }
  li{
    ${tw`
      px-2
      py-1
      bg-blue-500 
      select-none 
      flex 
      justify-between  
      w-full
    `}
    button {
      ${tw`
        cursor-pointer
      `}
    }
  }
  .links-only{
    div{
      ${tw`
        bg-blue-500 
        py-1 
        select-none  
        w-full 
        flex
        justify-between 
        px-4
      `}
    }
  }
  .groups-only{
    .header{
      ${tw`
        text-white
        bg-green-500 
        px-2  
        flex
        justify-between
        py-2
      `}
    }
  }
  .accordion__button{
    ${tw`
      p-0 
      bg-transparent
    `}
  }
  .group-item{
    ${tw`
      h-[0px]
      overflow-hidden
    `}
    transition : height ease-in 200ms; 
  }
  .group-item.show{
    ${tw`
      h-full
      overflow-visible
    `}
    transition : height ease-in 200ms; 
  }
  
`;

const Options = () => {
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
  } = uesLists();

  const addLinkRef = useRef();
  const addGroupRef = useRef();

  const addL = (e) => {
    e.preventDefault();

    const linkDetails = {
      link: addLinkRef.current.value,
    };

    addLink(linkDetails);
  };

  const addG = (e) => {
    e.preventDefault();

    const groupDetails = {
      title: addGroupRef.current.value,
    };

    addGroup(groupDetails);
  };

  return (
    <>
      {/* <button onClick={addL}>Add Link</button> <br />
      <button onClick={delL}>Delete Link</button> <br />
      <button onClick={updtLink}>Update Link</button> <br />
      <button onClick={addG}>Add Group</button> */}

      <Container>
        <Box>
          <form onSubmit={addL}>
            <input
              ref={addLinkRef}
              type="text"
              placeholder="Add New Link"
            />
            <button>Add New Link</button>
          </form>
          <ReactSortable
            className="links-only"
            group={{
              name: 'links-only',
              pull: 'clone',
              put: false,
            }}
            animation={200}
            list={links}
            setList={handleSortableUpdateLinks}
          >
            {links.length > 0 && links.map((item) => (
              <div key={item.id}>{item.link}
                <button onClick={() => deleteLink(item.id)}>del</button>
              </div>
            ))}
          </ReactSortable>
        </Box>
        <Box>
          <form onSubmit={addG}>
            <input
              ref={addGroupRef}
              type="text"
              placeholder="Add New Group"
            />
            <button>Add New Group</button>
          </form>
          <ReactSortable
            group={{
              name: 'groups-only',
              pull: false,
              put: false,
            }}
            list={groups}
            setList={handleSortableUpdateGroups}
            animation={200}
            className="groups-only"
          >
            {
              rendered && groups?.length > 0 && groups.map((i) => {
                return (
                  <div
                    key={i.id}
                  >
                    <div
                      className="header"
                    >
                      <h1
                        style={{ pointerEvents: 'none' }}
                      >{i.title}
                      </h1>
                      <span>
                        <button onClick={() => deleteGroup(i.id)}>Del</button>
                      </span>
                    </div>
                    <ReactSortable
                      animation={200}
                      group={{
                        name: `groups-${i.id}`,
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
                      list={i.children}
                      setList={(newValue) => handleUpdateChildren(i.id, newValue)}
                    >
                      {
                        i.children?.length > 0 && i.children.map((j) => {
                          return (
                            <li
                              key={j.id}
                            >
                              {j.link}
                              <button onClick={() => removeLinkFromGroup(i.id, j.id)}>remove</button>
                            </li>
                          );
                        })
                      }
                    </ReactSortable>
                  </div>
                );
              })
            }
          </ReactSortable>
        </Box>
      </Container>
    </>
  );
};

export default Options;
