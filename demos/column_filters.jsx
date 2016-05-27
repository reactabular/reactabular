'use strict';

var _ = require('lodash');

var React = require('react');

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

        return(
            <tr>
                {columns.map((column, i) => {
                    return (
                        <td key={i + '-custom-header'}>
                            {column.property ?
                              <input
                                onChange={this.onQueryChange}
                                className="header-input"
                                name={column.property}
                                placeholder={'Filter by '+column.property}
                              />
                            : ''}
                        </td>
                    );
                })}
            </tr>
        );
    }
}
ColumnFilters.propTypes = {
    columns: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    onChange: React.PropTypes.func.isRequired,
};

module.exports = ColumnFilters;
