import isEqual from 'lodash/isEqual';
import React from 'react';
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

    return !(isEqual(omitOnRow(this.props), omitOnRow(nextProps)) &&
      isEqual(this.context, nextContext));
  }
  render() {
    const { onRow, rows, rowKey, ...props } = this.props;
    const { bodyColumns, components } = this.context;

    props.ref = body => {
      this.ref = body;
    };

    return React.createElement(
      components.body.wrapper,
      props,
      rows.map((rowData, rowIndex) => (
        React.createElement(BodyRow, {
          key: resolveRowKey({ rowData, rowIndex, rowKey }),
          components: components.body,
          onRow,
          rowIndex,
          rowData,
          columns: bodyColumns
        })
      ))
    );
  }
  getRef() {
    return this.ref;
  }
}
Body.propTypes = tableBodyTypes;
Body.defaultProps = tableBodyDefaults;
Body.contextTypes = tableBodyContextTypes;

function resolveRowKey({ rowData, rowIndex, rowKey }) {
  if (typeof rowKey === 'function') {
    return `${rowKey({ rowData, rowIndex })}-row`;
  } else if (process.env.NODE_ENV !== 'production') {
    // Arrays cannot have rowKeys by definition so we have to go by index there.
    if (!Array.isArray(rowData) && !{}.hasOwnProperty.call(rowData, rowKey)) {
      console.warn( // eslint-disable-line no-console
        'Table.Body - Missing valid rowKey!',
        rowData,
        rowKey
      );
    }
  }

  return `${rowData[rowKey] || rowIndex}-row`;
}

function omitOnRow(props) {
  const { onRow, ...ret } = props; // eslint-disable-line no-unused-vars

  return ret;
}

export default Body;
