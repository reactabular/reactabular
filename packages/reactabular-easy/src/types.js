import React from 'react';

const globalWindow = window;

const propTypes = {
  window: React.PropTypes.object, // DOM window
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
  // Handlers
  onRow: React.PropTypes.func,
  onWidth: React.PropTypes.func,
  onDragColumn: React.PropTypes.func,
  onMoveColumns: React.PropTypes.func,
  onSelectRow: React.PropTypes.func,
  onSort: React.PropTypes.func
};

const defaultProps = {
  window: globalWindow,
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
