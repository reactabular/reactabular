import React from 'react';

class Row extends React.Component {
  constructor(props) {
    super(props);

    this.ref = null;
  }
  // TODO: track height
  render() {
    return <tr {...this.props} />;
  }
}

export default Row;
