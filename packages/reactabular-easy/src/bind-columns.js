import * as extensions from 'reactabular-column-extensions';
import * as sort from 'sortabular';

function bindColumns({
  window,
  props = {},
  onDragColumnStart, onDragColumn, onDragColumnEnd,
  onSort, onMoveColumns, onToggleShowingChildren,
  idField = 'id', parentField = 'parent',
  toggleChildrenProps,
  sortingColumns, rows
}) {
  return extensions.bind([
    extensions.draggableHeader({
      onMoveColumns
    }),
    extensions.highlightCell(),
    extensions.sortableHeader({
      sortingColumns,
      onSort,
      props: props.sort,
      strategy: sort.strategies.byProperty
    }),
    extensions.resizableHeader({
      window,
      onDragColumnStart,
      onDragColumn,
      onDragColumnEnd,
      props: props.resize
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
