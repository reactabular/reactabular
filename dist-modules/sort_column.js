'use strict';

module.exports = function (columns, column, done) {
    columns.map(function (col) {
        col.classes = {};

        return col;
    });

    column.sort = column.sort ? -column.sort : 1;
    column.classes = {
        'sort-asc': column.sort === 1,
        'sort-desc': column.sort === -1
    };

    done({
        sortingColumn: column,
        columns: columns });
};

module.exports.sort = function (data, column) {
    if (!column) {
        return data;
    }

    var property = column.property;

    return data.concat().sort(function (a, b) {
        var p1 = a[property] || '';
        var p2 = b[property] || '';

        if (p1.localeCompare) {
            return p1.localeCompare(p2) * column.sort;
        }

        return (p1 - p2) * column.sort;
    });
};