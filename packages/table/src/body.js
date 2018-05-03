import isEqual from 'deep-is';
import React from 'react';
import createRef from 'create-react-ref/lib/createRef';
import { tableDefaults, tableBodyTypes, tableBodyDefaults, tableBodyContextTypes } from './types';
import BodyRow from './body-row';
import resolveRowKey from './resolve-row-key';
import isFunction from './is-function';

class Body extends React.Component {
  constructor(props) {
    super(props);

    this.bodyRef = createRef();
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
    const { rows, rowKey, props } = this.props; // XXXXX: test props
    const { columns, renderers } = this.context;

    return React.createElement(
      renderers.body.wrapper,
      {
        props,
        renderer: tableDefaults.renderers.body.wrapper,
        columns,
        ref: this.bodyRef
      },
      rows.map((rowData, index) => {
        const rowIndex = rowData._index || index;
        const key = resolveRowKey({ rowData, rowIndex, rowKey });

        return React.createElement(BodyRow, {
          key,
          renderers: renderers.body,
          rowKey: key,
          rowIndex,
          rowData,
          columns
        });
      })
    );
  }
  getRef() {
    return this.bodyRef.current;
  }
}
Body.propTypes = tableBodyTypes;
Body.defaultProps = tableBodyDefaults;
Body.contextTypes = tableBodyContextTypes;

export default Body;
