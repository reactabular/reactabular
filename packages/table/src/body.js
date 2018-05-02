import { isEqual } from 'lodash';
import React from 'react';

import { tableBodyTypes, tableBodyDefaults, tableBodyContextTypes } from './types';
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
    const { rows, rowKey } = this.props;
    const { columns, renderers } = this.context;

    // XXXXX: Figure out how to handle ref
    /*
    props.ref = (body) => {
      this.ref = body;
    };
    */

    const renderer = renderers.body.wrapper;

    return renderer(
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
      }),
      { renderer, columns }
    );
  }
  /* getRef() {
    return this.ref;
  } */
}
Body.propTypes = tableBodyTypes;
Body.defaultProps = tableBodyDefaults;
Body.contextTypes = tableBodyContextTypes;

export default Body;
