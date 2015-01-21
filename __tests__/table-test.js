'use strict';

jest.dontMock('../lib/table.jsx');

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

var Table = require('../lib/table.jsx');


describe('Table', function() {
    it('should render a header based on `header` fields', function() {
        var columns = [
            {
                property: 'name',
                header: 'Name',
            },
            {
                property: 'position',
                header: 'Position',
            },
            {
                property: 'age',
                header: 'Age',
            },
        ];
        var table = TestUtils.renderIntoDocument(
            <Table columns={columns} />
        );

        var ths = TestUtils.scryRenderedDOMComponentsWithTag(
            table, 'th');

        expect(ths.length).toEqual(columns.length);
    });

    it('should render content based on data', function() {
        var columns = [
            {
                property: 'name',
                header: 'Name',
            },
            {
                property: 'position',
                header: 'Position',
            },
            {
                property: 'age',
                header: 'Age',
            },
        ];
        var data = [
            {name: 'foo'},
            {position: 'demo'},
            {age: 123}
        ];
        var table = TestUtils.renderIntoDocument(
            <Table columns={columns} data={data} />
        );

        var trs = TestUtils.scryRenderedDOMComponentsWithTag(
            table, 'tr');

        expect(trs.length).toEqual(data.length + 1);
    });
});
