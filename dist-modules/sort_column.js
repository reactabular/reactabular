'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodashSortbyorder = require('lodash.sortbyorder');

var _lodashSortbyorder2 = _interopRequireDefault(_lodashSortbyorder);

module.exports = function (columns, column, done) {
    columns.map(function (col) {
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

module.exports.sort = function (data, column) {
    if (!column) {
        return data;
    }

    var property = column.property;

    return (0, _lodashSortbyorder2['default'])(data, [property], [column.sort]);
};