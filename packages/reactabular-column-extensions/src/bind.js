import merge from 'webpack-merge';

const bindColumns = extensions => columns => (
  columns.map(
    column => bindColumn({
      column,
      extensions
    })
  )
);

function bindColumn({
  column,
  extensions
}) {
  const matches = extensions.map(({ match, evaluate }) => {
    const col = {
      cell: {},
      header: {},
      ...column
    };

    return match(col) && evaluate(col);
  });

  if (matches.length > 0) {
    return merge(column, ...matches);
  }

  return column;
}

export default bindColumns;
