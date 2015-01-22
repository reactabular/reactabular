'use strict';

jest.dontMock('../lib/cell.jsx');

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

var Cell = require('../lib/cell.jsx');
var editors = require('../lib/editors');


describe('Cell', function() {
    it('should render a value', function() {
        var value = 'value';
        var cell = TestUtils.renderIntoDocument(
            <Cell value={value} />
        );

        var td = TestUtils.findRenderedDOMComponentWithTag(cell, 'td');

        expect(td.getDOMNode().textContent).toEqual(value);
    });

    it('should be able to format', function() {
        var value = 'value';
        var formatter = function(v) {
            return v + v;
        };
        var cell = TestUtils.renderIntoDocument(
            <Cell value={value} formatter={formatter} />
        );

        var td = TestUtils.findRenderedDOMComponentWithTag(cell, 'td');

        expect(td.getDOMNode().textContent).toEqual(formatter(value));
    });

    it('should not be editable after click by default', function() {
        var cell = TestUtils.renderIntoDocument(
            <Cell value='value' />
        );

        var td = TestUtils.findRenderedDOMComponentWithTag(cell, 'td');

        TestUtils.Simulate.click(td);

        var inputs = TestUtils.scryRenderedDOMComponentsWithTag(cell, 'input');

        expect(inputs.length).toEqual(0);
    });

    it('should be editable if an editor is provided', function() {
        var countries = [
            {
                value: 'de',
                name: 'Germany',
            },
            {
                value: 'fi',
                name: 'Finland',
            },
            {
                value: 'se',
                name: 'Sweden',
            },
        ];
        var cell = TestUtils.renderIntoDocument(
            <Cell value='value' editor={editors.dropdown(countries)} />
        );

        var td = TestUtils.findRenderedDOMComponentWithTag(cell, 'td');

        TestUtils.Simulate.click(td);

        var selects = TestUtils.scryRenderedDOMComponentsWithTag(cell, 'select');

        expect(selects.length).toEqual(1);
    });
});
