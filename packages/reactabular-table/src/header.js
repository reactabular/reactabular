import React from 'react';
import { tableHeaderContextTypes } from './types';
import HeaderRow from './header-row';

class Header extends React.Component { // eslint-disable-line max-len, react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.ref = null;
  }
  render() {
    const { children, ...props } = this.props;
    const { headerRows, components } = this.context;

    props.ref = (header) => {
      this.ref = header;
    };

    return React.createElement(
      components.header.wrapper,
      props,
      [headerRows.map((row, i) =>
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
Header.propTypes = {
  children: React.PropTypes.any
};
Header.contextTypes = tableHeaderContextTypes;

export default Header;
