const reset = ({
  event = 'onDoubleClick',
  getSortingColumns = () => [],
  onReset = () => {}
}) => (value, { columnIndex }) => ({
  [event]: () => {
    const sortingColumns = getSortingColumns();

    if (!sortingColumns || !sortingColumns.length) {
      return;
    }

    const position = sortingColumns[columnIndex].position;
    const newSortingColumns = {};

    delete sortingColumns[columnIndex];

    Object.keys(sortingColumns).forEach(k => {
      const column = sortingColumns[k];

      if (column.position > position) {
        newSortingColumns[k] = {
          ...column,
          position: column.position - 1
        };
      } else {
        newSortingColumns[k] = column;
      }
    });

    onReset({
      sortingColumns: newSortingColumns
    });
  }
});

export default reset;
