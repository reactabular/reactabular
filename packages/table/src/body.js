import isEqual from 'deep-is';
import React from 'react';

import { tableDefaults, tableBodyTypes, tableBodyDefaults, tableBodyContextTypes } from './types';
import BodyRow from './body-row';
import resolveRowKey from './resolve-row-key';
import isFunction from './is-function';

class Body extends React.Component {
  constructor(props) {
    super(props);

    this.ref = null;
  }
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    // Check for wrapper based override.
    const { renderers } = nextContext;

    if (renderers && renderers.body && renderers.body.wrapper.shouldComponentUpdate) {
      if (isFunction(renderers.body.wrapper.shouldComponentUpdate)) {
        return renderers.body.wrapper.shouldComponentUpdate.call(this, nextProps, nextState, nextContext);
      }

      return true;
    }

    return (
      !(isEqual(this.props, nextProps) &&
      isEqual(this.context, nextContext))
    );
  }
  render() {
    const { rows, rowKey, ...props } = this.props; // XXXXX: test ...props
    const { columns, renderers } = this.context;

    return renderers.body.wrapper({
      renderer: tableDefaults.renderers.body.wrapper,
      columns,
      children: rows.map((rowData, index) => {
        const rowIndex = rowData._index || index;
        const key = resolveRowKey({ rowData, rowIndex, rowKey });

        return React.createElement(BodyRow, {
          key,
          renderers: renderers.body,
          rowKey: key,
          rowIndex,
          rowData,
          columns,
          ref: (body) => {
            this.ref = body;
          }
        });
      }),
      props
    });
  }
  getRef() {
    return this.ref;
  }
}
Body.propTypes = tableBodyTypes;
Body.defaultProps = tableBodyDefaults;
Body.contextTypes = tableBodyContextTypes;

export default Body;
