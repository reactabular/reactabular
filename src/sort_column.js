'use strict';

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

// sorter === lodash sortByOrder
// https://lodash.com/docs#sortByOrder
module.exports.sort = (data, column, sorter) => {
    if (!column) {
        return data;
    }

    return sorter(data, [column.property], [column.sort]);
};
