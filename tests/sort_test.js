'use strict';
import sortColumn from '../src/sort_column.js';
import {sortBy} from 'lodash';

describe('sortColumn', () => {

    it('sorts case-insensitively', function () {
        let data = [
            {
                name:'crep'
            },
            {
                name:'Bllop'
            },
            {
                name:'Dart'
            }
        ];
        expect(sortColumn.sort(data, {property:'name', sort: 'asc'}, sortBy))
            .to.deep.equal([{name:'Bllop'}, {name:'crep'}, {name:'Dart'}]);
    });

    it('maintains header classes after sort', function () {
        let columns = [
            {
                property: 'name',
                headerClass: 'foo'
            }
        ];
        sortColumn(columns, columns[0], function() {
            expect(columns[0].headerClass).to.have.string('foo');
        });
    });

});
