import isEqual from 'lodash/isEqual';
import isFunction from 'lodash/isFunction';
import React from 'react';
import { resolveRowKey } from 'reactabular-utils';
import { tableBodyTypes, tableBodyDefaults, tableBodyContextTypes } from './types';
import BodyRow from './body-row';

class Body extends React.Component {
  constructor(props) {
    super(props);

    this.ref = null;
  }
  shouldComponentUpdate(nextProps, nextState, nextContext) { // eslint-disable-line no-unused-vars
    // Skip checking props against `onRow` since that can be bound at render().
    // That's not particularly good practice but you never know how the users
    // prefer to define the handler.

    // Check for wrapper based override.
    const { components } = nextContext;

    if (components && components.body && components.body.wrapper.shouldComponentUpdate) {
      if (isFunction(components.body.wrapper.shouldComponentUpdate)) {
        return components.body.wrapper.shouldComponentUpdate.call(
          this, nextProps, nextState, nextContext
        );
      }

      return true;
    }

    return (
      !(isEqual(omitOnRow(this.props), omitOnRow(nextProps)) &&
      isEqual(this.context, nextContext))
    );
  }
  render() {
    const { onRow, rows, rowKey, ...props } = this.props;
    const { bodyColumns, components } = this.context;

    props.ref = (body) => {
      this.ref = body;
    };

    return React.createElement(
      components.body.wrapper,
      props,
      rows.map((rowData, index) => {
        const rowIndex = rowData._index || index;
        const key = resolveRowKey({ rowData, rowIndex, rowKey });

        return React.createElement(BodyRow, {
          key,
          components: components.body,
          onRow,
          rowKey: key,
          rowIndex,
          rowData,
          columns: bodyColumns
        });
      })
    );
  }
  getRef() {
    return this.ref;
  }
}
Body.propTypes = tableBodyTypes;
Body.defaultProps = tableBodyDefaults;
Body.contextTypes = tableBodyContextTypes;

function omitOnRow(props) {
  const { onRow, ...ret } = props; // eslint-disable-line no-unused-vars

  return ret;
}

export default Body;
