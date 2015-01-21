'use strict';


module.exports = (columns, data, done) => {
    return (column) => {
        var property = column.property;

        columns.map((column) => {
            column.classes = {};

            return column;
        });

        column.sort = column.sort? -column.sort: 1;
        column.classes = {
            'sort-asc': column.sort === 1,
            'sort-desc': column.sort === -1
        };

        data.sort((a, b) => {
            if(a[property].localeCompare) {
                return a[property].localeCompare(b[property]) * column.sort;
            }

            return (a[property] - b[property]) * column.sort;
        });

        done({
            columns: columns,
            data: data
        });
    };
};
