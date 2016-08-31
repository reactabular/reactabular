import { compose } from 'redux';
import { multipleColumns } from 'reactabular-search';
import pack from './pack';
import unpack from './unpack';

function searchTree({ columns, rows, query }) {
  return compose(
    unpack,
    multipleColumns({
      columns,
      query
    }),
    pack
  )(rows);
}

export default searchTree;
