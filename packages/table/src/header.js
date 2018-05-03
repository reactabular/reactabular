import React from 'react';
import createRef from 'create-react-ref/lib/createRef';
// XXX: tableDefaults
import { tableHeaderTypes, tableHeaderContextTypes } from './types';
import HeaderRow from './header-row';

class Header extends React.Component { // eslint-disable-line max-len, react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.headerRef = createRef();
  }
  render() {
    const { children, headerRows, ...props } = this.props; // XXXXX: Test props
    const { renderers, columns } = this.context;

    // XXXXX: Test headerRows, change name?
    // If headerRows aren't passed, default to bodyColumns as header rows
    return React.createElement(
      renderers.header.wrapper,
      {
        // XXXXX: Wrappers use different protocol than the others due to refs
        // renderer: tableDefaults.renderers.header.wrapper,
        // columns,
        ref: this.headerRef,
        ...props
      },
      [(headerRows || [columns]).map((rowData, rowIndex) =>
      React.createElement(HeaderRow, {
        key: `${rowIndex}-header-row`,
        renderers: renderers.header,
        rowData,
        rowIndex
      }))].concat(children)
    );
  }
  getRef() {
    return this.headerRef.current;
  }
}
Header.propTypes = tableHeaderTypes;
Header.contextTypes = tableHeaderContextTypes;

export default Header;
