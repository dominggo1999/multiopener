import React, { useContext } from 'react';
import { SidebarContext } from '../../context/Sidebar.context';

const Main = () => {
  const { open } = useContext(SidebarContext);

  return (
    <div
      role="button"
      onClick={open}
    >
      this is the main component
    </div>
  );
};

export default Main;
