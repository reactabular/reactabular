import classNames from 'classnames';
import defaultStrategy from './default-strategy';

const sort = ({
  event = 'onClick',
  getSortingColumns = () => [],
  onSort = () => {},
  strategy = defaultStrategy
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
    className: classNames(className, headerClass),
    [event]: () => onSort(field)
  };
};

export default sort;
