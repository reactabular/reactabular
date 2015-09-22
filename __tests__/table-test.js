'use strict';

jest.dontMock('../src/table');
jest.dontMock('../src/cells/index');
jest.dontMock('../src/cells/identity');

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

var Table = require('../src/table');


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

    it('should allow manipulation of complex objects in cell functions', function() {
        var columns = [
            {
                property: 'basic',
                header: 'Basic',
            },
            {
                property: 'identity',
                header: 'Identity',
                cell: (v) => v,
            },
            {
                property: 'math',
                header: 'Simple Math',
                cell: (v) => v - 23,
            },
            {
                property: 'complex',
                header: 'Cell Props',
                cell: (v) => ({ value: v, props: {className: 'complex'}}),
            },
            {
                property: 'jsx',
                header: 'JSX',
                cell: (v) => (<a href={'http://' + v.id}>{v.name}</a>),
            },
        ];
        var data = [
            {
                basic: 'basic',
                identity: 'ident',
                math: 123,
                complex: 'somestr',
                jsx: {id: 'some_id_123', name: 'helloworld'}
            },
        ];
        var table = TestUtils.renderIntoDocument(
            <Table columns={columns} data={data} />
        );

        var tds = TestUtils.scryRenderedDOMComponentsWithTag(table, 'td');
        expect(tds.length).toEqual(columns.length);
        expect(tds[0].getDOMNode().innerHTML).toBe('basic');
        expect(tds[1].getDOMNode().innerHTML).toBe('ident');
        expect(tds[2].getDOMNode().innerHTML).toBe('100');

        expect(tds[3].getDOMNode().className).toBe('complex');
        expect(tds[3].getDOMNode().innerHTML).toBe('somestr');

        var link = TestUtils.findRenderedDOMComponentWithTag(table, 'a');
        var linkDom = link.getDOMNode();
        expect(linkDom.parentNode).toEqual(tds[4].getDOMNode());
        expect(linkDom.href).toBe('http://some_id_123/');
        expect(linkDom.innerHTML).toBe('helloworld');
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
