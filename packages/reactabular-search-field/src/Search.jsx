import React from 'react';
import SearchOptions from './SearchOptions';

const Search = ({
  onChange, query, column, columns, i18n, ...props
}) => {
  const onColumnChange = ({ target: { value } }) => (
    onChange({
      ...query,
      [value]: query[value]
    })
  );
  const onQueryChange = ({ target: { value } }) => (
    onChange({
      ...query,
      [column]: value
    })
  );

  return (
    <div {...props}>
      <SearchOptions
        value={column}
        onChange={onColumnChange}
        columns={columns}
        i18n={i18n}
      />
      {columns.length ?
        <input onChange={onQueryChange} value={query[column]} /> :
        null
      }
    </div>
  );
};
Search.propTypes = {
  column: React.PropTypes.string,
  columns: React.PropTypes.array,
  query: React.PropTypes.object,
  onChange: React.PropTypes.func,
  i18n: React.PropTypes.shape({
    all: React.PropTypes.string
  })
};
Search.defaultProps = {
  columns: [],
  onChange: () => {},
  query: {},
  i18n: {
    all: 'All'
  }
};

export default Search;
