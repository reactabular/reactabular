import isEqual from 'lodash/isEqual';
import React from 'react';
import { tableBodyTypes, tableBodyContextTypes } from './types';
import BodyRow from './body-row';

class Body extends React.Component {
  constructor(props) {
    super(props);

    this.ref = null;
  }
  shouldComponentUpdate(nextProps, nextState, nextContext) {
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
      rows.map((r, i) => {
        if (process.env.NODE_ENV !== 'production') {
          // Arrays cannot have rowKeys by definition so we have to go by index there.
          if (!Array.isArray(r) && !{}.hasOwnProperty.call(r, rowKey)) {
            console.warn( // eslint-disable-line no-console
              'Table.Body - Missing valid rowKey!',
              r,
              rowKey
            );
          }
        }

        return React.createElement(BodyRow, {
          key: `${r[rowKey] || i}-row`,
          components: components.body,
          onRow,
          row: r,
          rowIndex: i,
          rowData: rows[i],
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
Body.defaultProps = {
  onRow: () => {}
};
Body.contextTypes = tableBodyContextTypes;

function omitOnRow(props) {
  const { onRow, ...ret } = props; // eslint-disable-line no-unused-vars

  return ret;
}

export default Body;
