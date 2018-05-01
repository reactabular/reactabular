import React from 'react';
import { tableHeaderTypes, tableHeaderContextTypes } from './types';
import HeaderRow from './header-row';

class Header extends React.Component { // eslint-disable-line max-len, react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.ref = null;
  }
  render() {
    const { children, headerRows } = this.props;
    const { renderers, columns } = this.context;
    const renderer = renderers.header.wrapper;

    // XXXXX: Figure out how to handle ref
    /* props.ref = (header) => {
      this.ref = header;
    }; */

    // If headerRows aren't passed, default to bodyColumns as header rows
    return renderers.header.wrapper(
      [(headerRows || [columns]).map((rowData, rowIndex) =>
        React.createElement(HeaderRow, {
          key: `${rowIndex}-header-row`,
          renderers: renderers.header,
          rowData,
          rowIndex
        }))].concat(children),
      { renderer, columns }
    );
  }
  /* getRef() {
    return this.ref;
  } */
}
Header.propTypes = tableHeaderTypes;
Header.contextTypes = tableHeaderContextTypes;

export default Header;
