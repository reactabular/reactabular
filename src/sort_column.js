'use strict';

module.exports = (columns, column, done) => {
    // reset old classes
    columns.forEach(function (col) {
        col.headerClass = col.headerClass.replace('sort-asc', '');
        col.headerClass = col.headerClass.replace('sort-desc', '');
    });

    column.sort = column.sort === 'asc' ? 'desc' : 'asc';

    // push sorting hint
    column.headerClass += ' sort-' + column.sort;

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
