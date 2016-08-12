import React from 'react';
import SearchOptions from './SearchOptions';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.onColumnChange = this.onColumnChange.bind(this);
    this.onQueryChange = this.onQueryChange.bind(this);
  }
  render() {
    const {
      onChange, query, column, columns, rows, i18n, ...props // eslint-disable-line no-unused-vars
    } = this.props;

    return (
      <div {...props}>
        <SearchOptions
          value={column}
          onChange={this.onColumnChange}
          columns={columns}
          i18n={i18n}
        />
        {columns.length ?
          <input onChange={this.onQueryChange} value={query[column]} /> :
          null
        }
      </div>
    );
  }
  onColumnChange(event) {
    const { query } = this.props;
    const column = event.target.value;

    this.setState({ column });
    this.props.onChange({
      ...query,
      [column]: query[column]
    });
  }
  onQueryChange(event) {
    const { query, column } = this.props;

    this.props.onChange({
      ...query,
      [column]: event.target.value
    });
  }
}
Search.propTypes = {
  column: React.PropTypes.string,
  columns: React.PropTypes.array,
  rows: React.PropTypes.array,
  query: React.PropTypes.object,
  onChange: React.PropTypes.func,
  i18n: React.PropTypes.shape({
    all: React.PropTypes.string
  })
};
Search.defaultProps = {
  columns: [],
  rows: [],
  onChange: () => {},
  query: {},
  i18n: {
    all: 'All'
  }
};

export default Search;
