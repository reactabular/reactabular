'use strict';

import sortByOrder from 'lodash.sortbyorder';

module.exports = (columns, column, done) => {
    columns.forEach((col) => {
        if(col.classes) {
            delete(col.classes['sort-asc']);
            delete(col.classes['sort-desc']);
        }
    });

    column.sort = column.sort === 'asc' ? 'desc' : 'asc';
    column.classes = {
        'sort-asc': column.sort === 'asc',
        'sort-desc': column.sort === 'desc'
    };

    done({
        sortingColumn: column,
        columns: columns
    });
};

module.exports.sort = (data, column, sorter = sortByOrder) => {
    if (!column) {
        return data;
    }

    var property = column.property;

    return sorter(data, [property], [column.sort]);
};
