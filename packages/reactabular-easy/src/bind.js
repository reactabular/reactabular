import {
  resizableColumn, sort, highlight
} from 'reactabular';
import * as tree from 'reactabular-tree';

function bindWidth() {
  return {
    match({ width }) {
      return width;
    },
    evaluate({ width }) {
      return {
        props: {
          style: {
            width,
            minWidth: width,
            maxWidth: width
          }
        }
      };
    }
  };
}

function bindHighlightCell() {
  return {
    match({ cell }) {
      return cell.highlight;
    },
    evaluate() {
      return {
        cell: {
          formatters: [
            highlight.cell
          ]
        }
      };
    }
  };
}

function bindToggleChildrenCell({
  idField,
  parentField,
  toggleChildrenProps,
  onToggleShowingChildren,
  rows
}) {
  return {
    match({ cell }) {
      return cell.toggleChildren;
    },
    evaluate() {
      return {
        cell: {
          formatters: [
            tree.toggleChildren({
              getRows: () => rows,
              getShowingChildren: ({ rowData }) => rowData.showingChildren,
              toggleShowingChildren: onToggleShowingChildren,
              // Without this it will perform checks against default id
              idField,
              parentField,
              props: toggleChildrenProps
            })
          ]
        }
      };
    }
  };
}

function bindDraggableHeader({
  onMoveColumns
}) {
  return {
    match({ header }) {
      return header.draggable;
    },
    evaluate({ header }) {
      return {
        header: {
          props: {
            // DnD needs this to tell header cells apart.
            // TODO: It might be a good idea to model this as an id instead.
            label: header.label,
            onMove: onMoveColumns
          }
        }
      };
    }
  };
}

function bindResizableHeader({
  window,
  onDragColumn,
  props
}) {
  return {
    match({ header }) {
      return header.resizable;
    },
    evaluate() {
      return {
        header: {
          formatters: [
            resizableColumn({
              onDrag: onDragColumn,
              parent: window,
              props
            })
          ]
        }
      };
    }
  };
}

function bindSortableHeader({
  sortingColumns,
  onSort,
  props
}) {
  return {
    match({ header }) {
      return header.sortable;
    },
    evaluate() {
      const getSortingColumns = () => sortingColumns || {};
      const sortable = sort.sort({
        getSortingColumns,
        onSort: (selectedColumn) => {
          onSort(
            sort.byColumns({
              sortingColumns,
              selectedColumn
            })
          );
        },
        strategy: sort.strategies.byProperty,
        props
      });

      return {
        header: {
          formatters: [
            sort.header({
              sortable,
              getSortingColumns,
              strategy: sort.strategies.byProperty
            })
          ],
          transforms: [
            sort.reset({
              event: 'onDoubleClick',
              getSortingColumns,
              strategy: sort.strategies.byProperty,
              onReset: params => onSort(params.sortingColumns)
            })
          ]
        }
      };
    }
  };
}

export {
  bindWidth as width,
  bindHighlightCell as highlightCell,
  bindToggleChildrenCell as toggleChildrenCell,
  bindDraggableHeader as draggableHeader,
  bindResizableHeader as resizableHeader,
  bindSortableHeader as sortableHeader
};
