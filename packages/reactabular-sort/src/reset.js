import defaultStrategy from './default-strategy';

const reset = ({
  event = 'onDoubleClick',
  getSortingColumns = () => [],
  onReset = () => {},
  strategy = defaultStrategy
}) => (value, extra) => ({
  [event]: () => {
    const sortingColumns = getSortingColumns();

    if (!sortingColumns || !Object.keys(sortingColumns).length) {
      return;
    }

    const field = extra[strategy.fieldName];

    const position = sortingColumns[field].position;
    const newSortingColumns = {};

    delete sortingColumns[field];

    Object.keys(sortingColumns).forEach((k) => {
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
