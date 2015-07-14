'use strict';

var React = require('react');

var Table = require('../src/table');


module.exports = React.createClass({
    displayName: 'NestedTable',
    getInitialState() {
        return {
            data: [
                {
                    id: 100,
                    name: 'Adam',
                    dad: {
                        id: 20,
                        name: 'John'
                    }
                },
                {
                    id: 101,
                    name: 'Brian',
                    dad: {
                        id: 22,
                        name: 'George'
                    }
                }
            ],
            columns: [
                {
                    property: 'name',
                    header: 'Name',
                },
                {
                    property: 'dad',
                    header: 'Dad',
                    cell: (value) => {
                        return 'id: ' + value.id + ', name: ' + value.name;
                    },
                },
            ],
        };
    },

    render() {
        var columns = this.state.columns || [];
        var data = this.state.data || [];

        return (
            <Table className='pure-table pure-table-striped'
                columns={columns}
                data={data} />
        );
    },
});
