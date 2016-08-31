import { compose } from 'redux';
import { multipleColumns } from 'reactabular-search';
import pack from './pack';
import unpack from './unpack';

function searchTree({ columns, query }) {
  return compose(
    unpack,
    multipleColumns({
      columns,
      query
    }),
    pack
  );
}

export default searchTree;
