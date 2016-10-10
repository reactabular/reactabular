import _columnMatches from './_column_matches';

const singleColumn = ({
  castingStrategy, columns, searchColumn = 'all', query, strategy, transform
}) => (rows) => {
  if (!query) {
    return rows;
  }

  let ret = columns;

  if (searchColumn !== 'all') {
    ret = columns.filter(col => col && col.property === searchColumn);
  }

  return rows.filter(row => ret.filter(column => _columnMatches({
    query, castingStrategy, column, strategy, transform, row
  })).length > 0);
};

export default singleColumn;
