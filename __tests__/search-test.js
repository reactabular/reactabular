'use strict';

jest.dontMock('../lib/search.jsx');
jest.dontMock('../lib/formatters/index.js');
jest.dontMock('../lib/formatters/identity.js');
jest.dontMock('../lib/predicates/index.js');
jest.dontMock('../lib/predicates/prefix.js');

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

var Search = require('../lib/search.jsx');


describe('Search', function() {
    it('should have a dropdown with default `all` option', function() {
        var search = TestUtils.renderIntoDocument(
            <Search />
        );

        var options = TestUtils.scryRenderedDOMComponentsWithTag(
            search, 'option');

        expect(options.length).toEqual(1);
        expect(options[0].getDOMNode().value).toEqual('all');
    });

    it('should have a dropdown that contain columns that have both property and header', function() {
        var columns = [
            {
                property: 'first',
                header: 'First',
            },
            {
                property: 'second'
            },
            {
                header: 'Third'
            },
        ];

        var search = TestUtils.renderIntoDocument(
            <Search columns={columns} />
        );

        var options = TestUtils.scryRenderedDOMComponentsWithTag(
            search, 'option');

        expect(options.length).toEqual(2);
        expect(options[0].getDOMNode().value).toEqual('all');
        expect(options[1].getDOMNode().value).toEqual(columns[0].property);
        expect(options[1].getDOMNode().textContent).toEqual(columns[0].header);
    });

    it('should be able to yield results', function() {
        var columns = [
            {
                property: 'first',
                header: 'First',
            },
        ];
        var value = 'demo';
        var data = [
            {
                first: value
            },
        ];
        var result = function(d) {
            expect(d.search.data).toEqual(data);
        };
        var search = TestUtils.renderIntoDocument(
            <Search columns={columns} data={data} onResult={result} />
        );

        var input = TestUtils.findRenderedDOMComponentWithTag(search, 'input');
        input.getDOMNode().value = value;

        TestUtils.Simulate.change(input);
    });

    it('should be able to yield zero results', function() {
        var columns = [
            {
                property: 'first',
                header: 'First'
            },
        ];
        var value = 'demo';
        var data = [
            {
                first: value
            },
        ];
        var result = function(d) {
            expect(d.search.data.length).toEqual(0);
        };
        var search = TestUtils.renderIntoDocument(
            <Search columns={columns} data={data} onResult={result} />
        );

        var input = TestUtils.findRenderedDOMComponentWithTag(search, 'input');
        input.getDOMNode().value = value + value;

        TestUtils.Simulate.change(input);
    });
});
