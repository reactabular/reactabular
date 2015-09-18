'use strict';

import sortByOrder from 'lodash.sortbyorder';

module.exports = (columns, column, done) => {
    columns.map((col) => {
        col.classes = {};

        return col;
    });

    column.sort = column.sort === 'asc' ? 'desc' : 'asc';
    column.classes = {
        'sort-asc': column.sort === 'asc',
        'sort-desc': column.sort === 'desc'
    };

    done({
        sortingColumn: column,
        columns: columns });
};

module.exports.sort = (data, column) => {
    if (!column) {
        return data;
    }

    var property = column.property;

    return sortByOrder(data, [property], [column.sort]);
};
