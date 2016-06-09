import React from 'react';
import uuid from 'uuid';

import Table from '../src/table';
import editors from '../src/editors';

import countries from './countries';

export default React.createClass({
    displayName: 'EditorsTable',
    getInitialState() {
        return {
            data: [
                {
                    name: 'Boolean',
                    editor: editors.boolean(),
                    code: 'editors.boolean()',
                    description: 'If initial value is true, allows setting to false and vice versa. Demo value defaults to false always.',
                    id: uuid.v4()
                },
                {
                    name: 'Dropdown',
                    editor: editors.dropdown(countries),
                    code: 'editors.dropdown(countries)',
                    description: 'The dropdown expects an array of value-name object pairs and emits the selected one.',
                    id: uuid.v4()
                },
                {
                    name: 'Customized dropdown',
                    editor: editors.dropdown(countries, {
                        // reversing fields to show the API
                        name: 'value',
                        value: 'name'
                    }),
                    code: 'editors.dropdown(countries, {name: <name>, value: <value>})',
                    description: 'This dropdown uses custom field definition.',
                    id: uuid.v4()
                },
                {
                    name: 'Input',
                    editor: editors.input(),
                    code: 'editors.input()',
                    description: 'Just a wrapper for a regular input.',
                    id: uuid.v4()
                },
            ],
            columns: [
                {
                    property: 'name',
                    header: 'Name',
                },
                {
                    property: 'editor',
                    header: 'Editor',
                    cell: (value) => React.createElement(value, {
                        value: '',
                        onValue: (v) =>
                            console.log(v)
                    }),
                },
                {
                    property: 'code',
                    header: 'Code',
                },
                {
                    property: 'description',
                    header: 'Description',
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
                data={data}
                rowKey='id' />
        );
    },
});
