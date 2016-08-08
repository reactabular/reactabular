import React from 'react';

// This is an example of a custom header component that applies a filter to
// each column
class ColumnFilters extends React.Component {
  constructor(props) {
    super(props);

    this.onQueryChange = this.onQueryChange.bind(this);
    this.state = {
      query: {}
    };
  }

  /**
   * Handles an input change on any of the filters.
   */
  onQueryChange(event) {
    const { onChange } = this.props;
    const { query } = this.state;

    query[event.target.name] = event.target.value;

    this.setState({ query }, () => {
      onChange(this.state.query);
    });
  }

  render() {
    const { columns } = this.props;

    return (
      <tr>
        {columns.map((column, i) => (
          <th key={`${i}-column-filter`} className="column-filter">
            {column.cell && column.cell.property ?
              <input
                onChange={this.onQueryChange}
                className="column-filter-input"
                name={column.cell.property}
                placeholder={column.filterPlaceholder || ''}
              />
            : ''}
          </th>
        ))}
      </tr>
    );
  }
}
ColumnFilters.propTypes = {
  columns: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  onChange: React.PropTypes.func.isRequired
};

export default ColumnFilters;
