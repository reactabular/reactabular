import {
  resizableColumn, sort, highlight
} from 'reactabular';
import * as dnd from 'reactabular-dnd';
import * as tree from 'reactabular-tree';

function bindColumns({
  window,
  props = {},
  onDragColumn, onSort, onMoveColumns, onToggleShowingChildren,
  idField = 'id', parentField = 'parent',
  toggleChildrenProps,
  sortingColumns, rows
}) {
  return (columns) => {
    const resizable = resizableColumn({
      onDrag: onDragColumn,
      props: props.resize,
      parent: window
    });

    const getSortingColumns = () => sortingColumns || {};
    const sortable = sort.sort({
      getSortingColumns,
      onSort: (selectedColumn) => {
        onSort(sort.byColumns({
          sortingColumns,
          selectedColumn
        }));
      },
      strategy: sort.strategies.byProperty,
      props: props.sort
    });
    const resetable = sort.reset({
      event: 'onDoubleClick',
      getSortingColumns,
      strategy: sort.strategies.byProperty,
      onReset: params => onSort(params.sortingColumns)
    });

    return columns.map(
      column => bindColumn({
        column,
        rows,
        idField,
        parentField,
        sortable,
        getSortingColumns,
        resetable,
        resizable,
        toggleChildrenProps,
        onMoveColumns,
        onToggleShowingChildren
      })
    );
  };
}

function bindColumn({
  column, rows,
  sortable, getSortingColumns, resetable, resizable,
  idField, parentField, toggleChildrenProps,
  onMoveColumns, onToggleShowingChildren
}) {
  if (column.header || column.cell) {
    const props = column.props || {};
    const header = column.header || {};
    const cell = column.cell || {};
    const existingHeaderProps = header.props;
    const existingHeaderFormat = header.format || (v => v);
    const existingHeaderTransforms = header.transforms || [];
    const existingCellFormat = cell.format || (v => v);
    const newCellFormats = [existingCellFormat];
    const newHeaderFormats = [existingHeaderFormat];
    let newHeaderProps = existingHeaderProps;
    let newHeaderTransforms = existingHeaderTransforms;
    let newStyle = {};

    if (header.sortable) {
      newHeaderFormats.push(sort.header({
        sortable,
        getSortingColumns,
        strategy: sort.strategies.byProperty
      }));
      newHeaderTransforms = newHeaderTransforms.concat([resetable]);
    }

    if (header.resizable) {
      newHeaderFormats.push(resizable);
    }

    if (header.draggable) {
      newHeaderProps = {
        // DnD needs this to tell header cells apart
        label: header.label,
        onMove: (labels) => {
          const {
            source,
            target,
            columns
          } = dnd.moveLabels(columns, labels);

          const tmpWidth = source.width;
          source.width = target.width;
          target.width = tmpWidth;

          onMoveColumns({
            source,
            target,
            columns
          });
        }
      };
    }

    if (cell.highlight) {
      newCellFormats.push((v, extra) => highlight.cell(
        existingCellFormat(v, extra),
        extra
      ));
    }

    if (cell.toggleChildren) {
      newCellFormats.push(
        tree.toggleChildren({
          getRows: () => rows,
          getShowingChildren: ({ rowData }) => rowData.showingChildren,
          toggleShowingChildren: onToggleShowingChildren,
          // Without this it will perform checks against default id
          idField,
          parentField,
          props: toggleChildrenProps
        })
      );
    }

    const newCellFormat = (value, extra) => (
      newCellFormats.reduce((parameters, format) => (
        {
          value: format(parameters.value, parameters.extra),
          extra
        }
      ), { value, extra }).value
    );

    const newHeaderFormat = (value, extra) => (
      newHeaderFormats.reduce((parameters, format) => (
        {
          value: format(parameters.value, parameters.extra),
          extra
        }
      ), { value, extra }).value
    );

    if (column.width) {
      newStyle = {
        width: column.width,
        minWidth: column.width,
        maxWidth: column.width
      };
    }

    return {
      ...column,
      props: {
        ...props,
        style: {
          ...props.style,
          ...newStyle
        }
      },
      header: {
        ...header,
        props: newHeaderProps,
        transforms: newHeaderTransforms,
        format: newHeaderFormat
      },
      cell: {
        ...cell,
        format: newCellFormat
      }
    };
  }

  return column;
}

export default bindColumns;
