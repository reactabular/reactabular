import orderBy from 'lodash/orderBy';
import { compose } from 'redux';
import { sorter } from 'reactabular-sort';
import pack from './pack';
import unpack from './unpack';

function sortTree({
  columns,
  idField,
  sortingColumns,
  strategy
} = {}) {
  return compose(
    unpack({
      idField
    }),
    sorter({
      columns,
      sortingColumns,
      sort: orderBy,
      strategy
    }),
    pack({
      idField
    })
  );
}

export default sortTree;
