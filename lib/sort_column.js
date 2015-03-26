'use strict';


module.exports = (columns, column, data, done, sorter) => {
    sorter = sorter || defaultSorter;

    columns.map((column) => {
        column.classes = {};

        return column;
    });

    column.sort = column.sort? -column.sort: 1;
    column.classes = {
        'sort-asc': column.sort === 1,
        'sort-desc': column.sort === -1
    };

    sorter(data, column);

    done({
        columns: columns,
        data: data
    });
};

function defaultSorter(data, column) {
    var property = column.property;

    data.sort((a, b) => {
        var p1 = a[property] || '';
        var p2 = b[property] || '';

        if(p1.localeCompare) {
            return p1.localeCompare(p2) * column.sort;
        }

        return (p1 - p2) * column.sort;
    });
}
module.exports.defaultSorter = defaultSorter;
