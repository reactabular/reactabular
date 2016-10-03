import singleColumn from './single_column';

const multipleColumns = ({
  castingStrategy, columns, query, strategy, transform
}) => data => (
  query ?
    Object.keys(query).reduce(
      (filteredData, searchColumn) =>
        singleColumn({
          castingStrategy,
          columns,
          searchColumn,
          query: query[searchColumn],
          strategy,
          transform
        })(filteredData),
      data
    )
  : data
);

export default multipleColumns;
