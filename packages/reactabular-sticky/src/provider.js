/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { Provider as TableProvider } from 'reactabular-table';

class Provider extends React.Component {
  constructor(props) {
    super(props);

    this.onScroll = this.onScroll.bind(this);
  }
  render() {
    return <TableProvider {...this.props} onScroll={this.onScroll} />
  }
  onScroll({ target: { scrollLeft, scrollTop } }) {
    this.props.onScroll({
      left: scrollLeft,
      top: scrollTop
    });
  }
}
Provider.propTypes = {
  onScroll: React.PropTypes.func.isRequired
};

export default Provider;
