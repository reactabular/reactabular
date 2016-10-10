import React from 'react';

const SearchColumns = ({ columns, query, onChange }) => {
  const onQueryChange = (event) => {
    onChange({
      ...query,
      [event.target.name]: event.target.value
    });
  };

  return (
    <tr>
      {columns.map(column => (
        <th key={`${column.property}-column-filter`} className="column-filter">
          {column && column.property ?
            <input
              onChange={onQueryChange}
              className="column-filter-input"
              name={column.property}
              placeholder={column.filterPlaceholder || ''}
              value={query[column.property]}
            />
          : ''}
        </th>
      ))}
    </tr>
  );
};
SearchColumns.propTypes = {
  columns: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  onChange: React.PropTypes.func.isRequired,
  query: React.PropTypes.object
};

export default SearchColumns;
