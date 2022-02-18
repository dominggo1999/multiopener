import React, { useState, useEffect } from 'react';
import short from 'short-uuid';
import { storageGet, storageSet } from '../util';

const useLists = () => {
  const [links, setLinks] = useState([]);
  const [groups, setGroups] = useState([]);
  const [rendered, setRendered] = useState(false);

  const groupsContainLink = (id) => {
    return groups.filter((group) => {
      const childrenIds = group.children.map((i) => i.id);

      return childrenIds.includes(id);
    });
  };

  const addLinkToGroups = (parentGroups, link) => {
    const tempGroups = [...groups];

    for (let i = 0; i < tempGroups.length; i += 1) {
      const group = tempGroups[i];
      if(parentGroups.map((j) => j.value).includes(group.id)) {
        // only if link doesnt exist in the  target group then add link to target group
        const childrenIds = group.children.map((i) => i.id);

        if(!childrenIds.includes(link.id)) {
          group.children.push(link);
        }
      }
    }

    setGroups(tempGroups);
    storageSet('groups', tempGroups);
  };

  // Links only modifier
  const getSingleLink = (linkId) => {
    return links.filter((link) => link.id === linkId)[0];
  };

  const addLink = (linkDetails, parentGroups) => {
    const id = short.generate();
    const newLink = {
      ...linkDetails,
      id,
    };
    addLinkToGroups(parentGroups, newLink);

    setLinks((prevLinks) => {
      return [
        ...prevLinks,
        newLink,
      ];
    });

    storageSet('links', [
      ...links,
      newLink,
    ]);
  };

  const deleteLink = (id) => {
    const tempLinks = [...links];

    const newLinks = tempLinks.filter((link) => {
      return link.id !== id;
    });

    storageSet('links', newLinks);
    setLinks(newLinks);

    // Delete deleted link from groups

    const tempGroups = [...groups];

    for (let i = 0; i < tempGroups.length; i += 1) {
      const group = tempGroups[i];

      // Find link in group children
      const target = group.children.filter((link) => {
        return link.id === id;
      })[0];

      const targetIndex = group.children.indexOf(target);

      // If link exists in group, delete
      if(targetIndex > -1) {
        group.children.splice(targetIndex, 1);
      }
    }

    setGroups(tempGroups);
    storageSet('groups', tempGroups);
  };

  const updateLink = (id, newValues, parentGroups) => {
    const tempLinks = [...links];

    const targetLink = tempLinks.filter((link) => {
      return link.id === id;
    })[0];

    if(!targetLink || !id) return;

    // New Values must be the last
    const updatedLink = {
      ...targetLink,
      ...newValues,
    };

    const targetIndex = tempLinks.indexOf(targetLink);

    if(targetIndex > -1) {
      tempLinks[targetIndex] = updatedLink;
    }

    setLinks(tempLinks);

    storageSet('links', tempLinks);

    // update link in group too

    const tempGroups = [...groups];

    for (let i = 0; i < tempGroups.length; i += 1) {
      const group = tempGroups[i];
      const persist = parentGroups.map((i) => i.value).includes(group.id);

      // Find link in group children
      const target = group.children.filter((link) => {
        return link.id === id;
      })[0];

      const targetIndex = group.children.indexOf(target);

      // If link exists in group
      if(targetIndex > -1) {
        // If need to persist ,  update
        if(persist) {
          group.children[targetIndex] = updatedLink;
        }else{
          // Else , delete
          group.children.splice(targetIndex, 1);
        }
      }else if (persist) {
        group.children.push(updatedLink);
      }
    }

    setGroups(tempGroups);
    storageSet('groups', tempGroups);
  };

  // Delete link only from a certain group
  const removeLinkFromGroup = (groupId, linkId) => {
    // Find group target
    const targetGroup = groups.filter((group) => {
      return group.id === groupId;
    })[0];

    // Find group index
    const targetGroupIndex = groups.indexOf(targetGroup);

    const tempGroups = [...groups];

    const newLinksInGroup = targetGroup.children.filter((link) => {
      return link.id !== linkId;
    });

    tempGroups[targetGroupIndex].children = newLinksInGroup;

    setGroups(tempGroups);

    storageSet('groups', tempGroups);
  };

  // Group only modifier
  const getSingleGroup = (groupId) => {
    return groups.filter((group) => group.id === groupId)[0];
  };

  const addGroup = (groupDetails, children) => {
    const childrenIds = children.map((i) => i.value);

    const addedChildren = links.filter((link) => {
      return childrenIds.includes(link.id);
    });

    const id = short.generate();
    const newGroup = {
      id,
      children: addedChildren,
      ...groupDetails,
    };

    setGroups((prevGroups) => {
      return [
        ...prevGroups,
        newGroup,
      ];
    });

    storageSet('groups', [
      ...groups,
      newGroup,
    ]);
  };

  const deleteGroup = (id) => {
    // Copy Groups
    const tempGroups = [...groups];

    const newGroups = tempGroups.filter((group) => {
      return group.id !== id;
    });

    storageSet('groups', newGroups);

    setGroups(newGroups);
  };

  const updateGroup = (id, newValues, children) => {
    const tempGroups = [...groups];

    const targetGroup = tempGroups.filter((group) => {
      return group.id === id;
    })[0];

    if(!targetGroup || !id) return;

    const addedChildrenIds = children.map((i) => i.value);
    const existingChildrenIds = targetGroup.children.map((i) => i.id);

    // ADDING
    // If already exist dont push
    for (let i = 0; i < addedChildrenIds.length; i += 1) {
      if(!existingChildrenIds.includes(addedChildrenIds[i])) {
        const newLink = getSingleLink(addedChildrenIds[i]);

        targetGroup.children.push(newLink);
      }
    }

    // DELETING
    for (let i = 0; i < existingChildrenIds.length; i += 1) {
      const linkId = existingChildrenIds[i];

      // Check if link presnt or not in the addedChildren
      if(!addedChildrenIds.includes(linkId)) {
        const targetLink = targetGroup.children.filter((i) => i.id === linkId)[0];
        const targetIndex = targetGroup.children.indexOf(targetLink);

        targetGroup.children.splice(targetIndex, 1);
      }
    }

    // New Values must be the last
    const updatedGroups = {
      ...targetGroup,
      ...newValues,
    };

    const targetIndex = tempGroups.indexOf(targetGroup);

    if(targetIndex > -1) {
      tempGroups[targetIndex] = updatedGroups;
    }

    setGroups(tempGroups);
    storageSet('groups', tempGroups);
  };

  // React sortable modifying links
  const handleSortableUpdateLinks = (newLinks) => {
    if(rendered) {
      storageSet('links', newLinks);
      setLinks(newLinks);
    }
  };

  // React sortable modifying groups
  const handleSortableUpdateGroups = (newGroups) => {
    if(rendered) {
      storageSet('groups', newGroups);
      setGroups(newGroups);
    }
  };

  // Children of groups
  const handleUpdateChildren = (parentId, newValue) => {
    if(rendered) {
      // Find Parents
      const target = groups.filter((group) => {
        return group.id === parentId;
      })[0];

      const targetIndex = groups.indexOf(target);

      const tempGroups = [...groups];

      tempGroups[targetIndex].children = newValue;

      setGroups(tempGroups);

      storageSet('groups', tempGroups);
    }
  };

  useEffect(() => {
    const getData = async () => {
      const links = await storageGet('links');
      const groups = await storageGet('groups');

      setLinks(links);
      setGroups(groups);
      setRendered(true);
    };

    getData();
  }, []);

  return {
    rendered,
    links,
    groups,
    addLink,
    groupsContainLink,
    deleteLink,
    updateLink,
    removeLinkFromGroup,
    addGroup,
    getSingleGroup,
    deleteGroup,
    updateGroup,
    handleSortableUpdateLinks,
    handleSortableUpdateGroups,
    handleUpdateChildren,
  };
};

export default useLists;
