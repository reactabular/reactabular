'use strict';

var React = require('react');


module.exports = React.createClass({
    render() {
        var columns = this.props.columns || [];
        var options = [{
            value: 'all',
            name: 'All'
        }].concat(columns.map((column) => {
            if(column.property && column.header) {
                return {
                    value: column.property,
                    name: column.header
                };
            }
        }).filter(id));

        return <span className='search'>
            <select ref='column' onChange={this.change}>{options.map((option) =>
                <option key={option.value + '-option'} value={option.value}>{option.name}</option>
            )
            }</select>
            <input ref='query' onChange={this.change}></input>
        </span>;
    },

    change(e) {
        var query = this.refs.query.getDOMNode().value;
        var column = this.refs.column.getDOMNode().value;

        this.search(query, column);
    },

    search(query, column) {
        if(!this.props.columns) {
            return;
        }

        var data = this.props.data || [];
        var columns = this.props.columns;

        if(column !== 'all') {
            columns = this.props.columns.filter((col) =>
                col.property === column
            );
        }

        (this.props.onResult || noop)({
            data: data.map((row) => {
                row._visible = columns.filter(isColumnVisible.bind(null, row)).length > 0;

                return row;
            })
        });

        function isColumnVisible(row, column) {
            var formatter = column.formatter || id;
            var formattedValue = formatter(row[column.property]);

            if(!formattedValue) {
                return;
            }

            if(formattedValue.toLowerCase) {
                return formattedValue.toLowerCase().indexOf(query.toLowerCase()) === 0;
            }
        }
    },
});

function id(a) {return a;}
function noop() {}
