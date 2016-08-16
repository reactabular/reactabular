import React from 'react';

const propTypes = {
  columns: React.PropTypes.array,
  rows: React.PropTypes.array,
  rowKey: React.PropTypes.string.isRequired,
  query: React.PropTypes.object,
  sortingColumns: React.PropTypes.object,
  headerExtra: React.PropTypes.any,
  tableWidth: React.PropTypes.any.isRequired,
  tableHeight: React.PropTypes.any.isRequired,
  classNames: React.PropTypes.object,
  styles: React.PropTypes.object,
  components: React.PropTypes.object,
  onRow: React.PropTypes.func,
  onDragColumn: React.PropTypes.func,
  onMoveColumns: React.PropTypes.func,
  onSelectRow: React.PropTypes.func,
  onSort: React.PropTypes.func
};

const defaultProps = {
  classNames: {
    table: null,
    header: {
      wrapper: null
      // TODO
      /*
      row: null,
      cell: null
      */
    },
    body: {
      wrapper: null
      // TODO
      /*
      row: null,
      cell: null
      */
    }
  },
  styles: {
    resize: {
      container: {},
      value: {},
      handle: {}
    },
    sort: {
      container: {},
      value: {},
      order: {}
    }
  },
  components: {},
  onRow: () => ({}),
  onDragColumn: () => {},
  onMoveColumns: () => {},
  onSelectRow: () => {},
  onSort: () => {}
};

export {
  propTypes,
  defaultProps
};
