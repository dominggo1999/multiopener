import React, { useContext, useEffect } from 'react';
import { SidebarWrapper, SidebarScrollArea }from './Sidebar.style';
import { SidebarContext } from '../../context/Sidebar.context';
import useSizes from '../../../hooks/useSizes';

const Sidebar = () => {
  const { show, close } = useContext(SidebarContext);
  const { isXLarge } = useSizes();

  useEffect(() => {
    // Always close sidebar on xlarge screen size
    close();
  }, [isXLarge]);

  return (
    <SidebarWrapper open={show}>
      <SidebarScrollArea>
        <button onClick={close}>close</button>
        <br />
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste cum molestias provident quas nulla minima sunt eos! Quo molestias amet atque cum, aspernatur voluptates necessitatibus?
      </SidebarScrollArea>
    </SidebarWrapper>
  );
};

export default Sidebar;
