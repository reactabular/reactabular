import singleColumn from './single_column';

const multipleColumns = ({
  columns, query, strategy, transform
}) => data => (
  query ?
    Object.keys(query).reduce(
      (filteredData, searchColumn) =>
        singleColumn({
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
