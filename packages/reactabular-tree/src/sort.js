import orderBy from 'lodash/orderBy';
import { compose } from 'redux';
import { sorter } from 'reactabular-sort';
import pack from './pack';
import unpack from './unpack';

function sortTree({
  columns,
  sortingColumns,
  strategy
}) {
  return compose(
    unpack(),
    sorter({
      columns,
      sortingColumns,
      sort: orderBy,
      strategy
    }),
    pack()
  );
}

export default sortTree;
