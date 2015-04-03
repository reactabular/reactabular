'use strict';

jest.dontMock('../lib/table.jsx');
jest.dontMock('../lib/cells/index.js');
jest.dontMock('../lib/cells/identity.js');

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

var Table = require('../lib/table.jsx');


var Footer = React.createClass({
    displayName: 'Footer',
    render() {
        return (
            <tfoot>
                <tr>Dancing is the poetry of the foot.</tr>
            </tfoot>
        );
    }
});

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

    it('should render correctly with no properties', function() {
        var renderedTable = TestUtils.renderIntoDocument(
            <Table/>
        );

        expect(renderedTable.props.data).toEqual([]);
        expect(renderedTable.props.columns).toEqual([]);
        expect(renderedTable.props.header).toEqual({});
    });

    it('should render children correctly', function() {
        var renderedTable = TestUtils.renderIntoDocument(
            <Table>
                <Footer/>
            </Table>
        );

        TestUtils.findRenderedComponentWithType(renderedTable, Footer);
    });
});
