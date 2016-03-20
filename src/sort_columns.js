'use strict';

module.exports = (columns, sortColumns, column, done) => {
    let newSortCols = undefined;

    if (typeof sortColumns === 'undefined') {
        newSortCols = [column];
    }
    else if (sortColumns.includes(column)) {
        newSortCols = sortColumns;
    }
    else {
        newSortCols = [...sortColumns, column];
    }

	// cycle through: asc, desc, no sort
    if (typeof column.sort === 'undefined' || column.sort === '') {
        column.sort = 'asc';
        column.headerClass = 'sort-asc';
    } else if (column.sort === 'asc') {
        column.sort = 'desc';
        column.headerClass = 'sort-desc';
    } else {
        let idx = newSortCols.indexOf(column);
        if (idx > -1) {
            newSortCols.splice(idx, 1);
        }
        column.headerClass = null;
        column.sort = '';
    }

    done({
        sortingColumns: newSortCols,
        columns: columns
    });
};

// sorter === lodash orderBy
// https://lodash.com/docs#orderBy
module.exports.sort = (data, sortColumns, sorter) => {
    if (!sortColumns) {
        return data;
    }

    let propertyList = [];
    let orderList = [];

    sortColumns.forEach((column) => {
        propertyList.push(column.property);
        orderList.push(column.sort);
    });

    return sorter(data, propertyList, orderList);
};

