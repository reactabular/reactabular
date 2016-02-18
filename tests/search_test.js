'use strict';
var React = require('react');
var TestUtils = require('react-addons-test-utils');
var Search = require('../src/search');

describe('Search', function() {
    it('should have a dropdown with default `all` option', function() {
        var search = TestUtils.renderIntoDocument(
            <Search />
        );

        var options = TestUtils.scryRenderedDOMComponentsWithTag(
            search, 'option');

        expect(options.length).to.equal(1);
        expect(options[0].value).to.equal('all');
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

        expect(options.length).to.equal(2);
        expect(options[0].value).to.equal('all');
        expect(options[1].value).to.equal(columns[0].property);
        expect(options[1].textContent).to.equal(columns[0].header);
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
            expect(d.data).to.equal(data);
        };
        var search = TestUtils.renderIntoDocument(
            <Search columns={columns} data={data} onResult={result} />
        );

        var input = TestUtils.findRenderedDOMComponentWithTag(search, 'input');
        input.value = value;

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
            expect(d.data.length).to.equal(0);
        };
        var search = TestUtils.renderIntoDocument(
            <Search columns={columns} data={data} onResult={result} />
        );

        var input = TestUtils.findRenderedDOMComponentWithTag(search, 'input');
        input.value = value + value;

        TestUtils.Simulate.change(input);
    });

    it('should allow i18n', function() {
        var expected = 'Kaikki';
        var search = TestUtils.renderIntoDocument(
            <Search i18n={{all: expected}} />
        );
        var select = TestUtils.findRenderedDOMComponentWithTag(search, 'select')[0];

        expect(select.text).to.equal(expected);
    });
});
