import { mergeClassNames } from 'reactabular-utils';
import strategies from './strategies';

const sort = ({
  event = 'onClick',
  getSortingColumns = () => [],
  onSort = () => {},
  strategy = strategies.byIndex
} = {}) => (_value, extra, { className, ...props } = {}) => {
  const sortingColumns = getSortingColumns();
  const field = extra[strategy.fieldName];
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
