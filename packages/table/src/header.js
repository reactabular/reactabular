import React from 'react';

import { tableDefaults, tableHeaderTypes, tableHeaderContextTypes } from './types';
import HeaderRow from './header-row';

class Header extends React.Component { // eslint-disable-line max-len, react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.ref = null;
  }
  render() {
    const { children, headerRows, ...props } = this.props; // XXXXX: Test ...props
    const { renderers, columns } = this.context;

    // XXXXX: Test headerRows, change name?
    // If headerRows aren't passed, default to bodyColumns as header rows
    return renderers.header.wrapper({
      renderer: tableDefaults.renderers.header.wrapper,
      columns,
      children: [(headerRows || [columns]).map((rowData, rowIndex) =>
        React.createElement(HeaderRow, {
          key: `${rowIndex}-header-row`,
          renderers: renderers.header,
          rowData,
          rowIndex,
          ref: (header) => {
            this.ref = header;
          }
        }))].concat(children),
      props
    });
  }
  getRef() {
    return this.ref;
  }
}
Header.propTypes = tableHeaderTypes;
Header.contextTypes = tableHeaderContextTypes;

export default Header;
