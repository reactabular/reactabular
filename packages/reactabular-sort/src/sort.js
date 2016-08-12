import { mergeClassNames } from 'reactabular-utils';

const sort = ({
  event = 'onClick',
  getSortingColumns = () => [],
  onSort = () => {},
  fieldName = 'columnIndex'
} = {}) => (_value, extra, { className, ...props } = {}) => {
  const sortingColumns = getSortingColumns();
  const field = extra[fieldName];
  let headerClass = 'sort sort-none';

  // Check against undefined to allow zero
  if (sortingColumns[field] !== undefined) {
    headerClass = `sort sort-${sortingColumns[field].direction}`;
  }

  return {
    ...props,
    className: mergeClassNames(className, headerClass),
    [event]: () => onSort(field)
  };
};

export default sort;
