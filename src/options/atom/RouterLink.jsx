import React from 'react';
import { Link as RRLink, NavLink as RRNavLink } from 'react-router-dom';
import tw from 'twin.macro';

const scrollToTop = (callback = () => {}) => {
  window.scrollTo(0, 0);

  callback();
};

export const NavLink = (props) => {
  const {
    children, closeNavbar, handleClick, ...rest
  } = props;

  return (
    <RRNavLink
      tw="inline-flex"
      onClick={() => scrollToTop(handleClick)}
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
      tw="inline-flex mb-4"
      onClick={scrollToTop}
      {...rest}
    >
      {children}
    </RRLink>
  );
};

export default Link;
