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
      bind.width(),
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
  }).filter(a => a);

  console.log(matches); // eslint-disable-line no-console

  // TODO: merge against the original column definition and return
  // return merge(column, ...matches);

  return column;
}

export default bindColumns;
