import React from 'react';

const SearchColumns = ({ columns, query, onChange }) => {
  const onQueryChange = (event) => {
    onChange({
      ...query,
      [event.target.name]: event.target.value
    });
  };

  const renderSearchColumn = (column, i) => {
    if (column.children && column.children.length) {
      return column.children.map(renderSearchColumn);
    }
    return (
      <th key={`${column.property || i}-column-filter`} className="column-filter" colSpan={column.props && column.props.colSpan}>
        {column && column.property ?
          <input
            onChange={onQueryChange}
            className="column-filter-input"
            name={column.property}
            placeholder={column.filterPlaceholder || ''}
            value={query[column.property] || ''}
          />
        : ''}
      </th>
    );
  };

  return (
    <tr>
      {columns.map(renderSearchColumn)}
    </tr>
  );
};
SearchColumns.propTypes = {
  columns: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  onChange: React.PropTypes.func.isRequired,
  query: React.PropTypes.object
};

export default SearchColumns;
