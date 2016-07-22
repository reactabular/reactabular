import { mergeClassNames } from '../../reactabular-utils/src';

const sort = ({
  getSortingColumns = () => [],
  onSort = () => {}
} = {}) => (_value, { columnIndex }, { className, ...props } = {}) => {
  const columns = getSortingColumns();
  let headerClass = 'sort sort-none';

  // Check against undefined to allow zero
  if (columns[columnIndex] !== undefined) {
    headerClass = `sort sort-${columns[columnIndex].direction}`;
  }

  return {
    ...props,
    className: mergeClassNames(className, headerClass),
    onClick: () => onSort(columnIndex)
  };
};

export default sort;
