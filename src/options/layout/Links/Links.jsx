import React from 'react';
import { LinksContainer } from './Links.style';
import { Col } from '../../atom/Col';
import Singles from '../Singles/Singles';
import Groups from '../Groups/Groups';
import ListProvider from '../../context/List.context';

const Links = () => {
  return (
    <LinksContainer>
      <Col>
        <Singles />
      </Col>
      <Col>
        <Groups />
      </Col>
    </LinksContainer>
  );
};

export default Links;
