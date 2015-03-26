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
        if(a[property].localeCompare) {
            return a[property].localeCompare(b[property]) * column.sort;
        }

        return (a[property] - b[property]) * column.sort;
    });
}
module.exports.defaultSorter = defaultSorter;
