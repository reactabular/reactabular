import merge from 'webpack-merge';
import * as bind from './bind';

function bindColumns({
  window,
  props = {},
  onDragColumn, onSort, onMoveColumns, onToggleShowingChildren,
  idField = 'id', parentField = 'parent',
  toggleChildrenProps,
  sortingColumns, rows
}) {
  return (columns) => {
    const bindings = [
      bind.highlightCell(),
      bind.toggleChildrenCell({
        idField,
        parentField,
        toggleChildrenProps,
        onToggleShowingChildren,
        rows
      }),
      bind.draggableHeader({
        onMoveColumns
      }),
      bind.resizableHeader({
        window,
        onDragColumn,
        props: props.resize
      }),
      bind.sortableHeader({
        sortingColumns,
        onSort,
        props: props.sort
      })
    ];

    return columns.map(
      column => bindColumn({
        column,
        bindings
      })
    );
  };
}

function bindColumn({
  column,
  bindings
}) {
  const matches = bindings.map((binding) => {
    const col = {
      cell: {},
      header: {},
      ...column
    };

    return binding.match(col) && binding.evaluate(col);
  });

  return merge(column, ...matches);
}

export default bindColumns;
