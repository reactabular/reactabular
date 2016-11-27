import * as extensions from 'reactabular-column-extensions';
import * as sort from 'sortabular';

function bindColumns({
  window,
  props = {},
  onDragColumn, onSort, onMoveColumns, onToggleShowingChildren,
  idField = 'id', parentField = 'parent',
  toggleChildrenProps,
  sortingColumns, rows
}) {
  return extensions.bind([
    extensions.draggableHeader({
      onMoveColumns
    }),
    extensions.highlightCell(),
    extensions.resizableHeader({
      window,
      onDragColumn,
      props: props.resize
    }),
    extensions.sortableHeader({
      sortingColumns,
      onSort,
      props: props.sort,
      strategy: sort.strategies.byProperty
    }),
    extensions.toggleChildrenCell({
      idField,
      parentField,
      onToggleShowingChildren,
      props: toggleChildrenProps,
      rows
    })
  ]);
}

export default bindColumns;
