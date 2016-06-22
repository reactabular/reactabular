import React from 'react';
import Fork from 'react-ghfork';
import { Page } from 'catalog';

const CustomPage = ({ children }) => (
  <Page>
    <Fork className="right" project="bebraw/reactabular" />
    {children}
  </Page>
);
CustomPage.propTypes = {
  children: React.PropTypes.any,
};

export default CustomPage;
