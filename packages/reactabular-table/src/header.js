import React from 'react';
import { tableHeaderTypes, tableHeaderContextTypes } from './types';
import HeaderRow from './header-row';

class Header extends React.Component { // eslint-disable-line max-len, react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.ref = null;
  }
  render() {
    const { children, headerRows, ...props } = this.props;
    const { components, columns } = this.context;

    props.ref = (header) => {
      this.ref = header;
    };

    // If headerRows aren't passed, default to bodyColumns as header rows
    return React.createElement(
      components.header.wrapper,
      props,
      [(headerRows || [columns]).map((row, i) =>
        React.createElement(HeaderRow, {
          key: `${i}-header-row`,
          components: components.header,
          row
        })
      )].concat(children)
    );
  }
  getRef() {
    return this.ref;
  }
}
Header.propTypes = tableHeaderTypes;
Header.contextTypes = tableHeaderContextTypes;

export default Header;
