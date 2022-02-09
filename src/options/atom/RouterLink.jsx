import React from 'react';
import { Link as RRLink, NavLink as RRNavLink } from 'react-router-dom';

const scrollToTop = () => {
  window.scrollTo(0, 0);
};

export const NavLink = (props) => {
  const { children, closeNavbar, ...rest } = props;

  return (
    <RRNavLink
      onClick={scrollToTop}
      {...rest}
    >
      {children}
    </RRNavLink>
  );
};

const Link = (props) => {
  const { children, ...rest } = props;

  return (
    <RRLink
      onClick={scrollToTop}
      {...rest}
    >
      {children}
    </RRLink>
  );
};

export default Link;
