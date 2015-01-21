'use strict';

jest.dontMock('../lib/paginator.jsx');

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

var Paginator = require('../lib/paginator.jsx');


describe('Paginator', function() {
    it('should construct a link for each page', function() {
        var amount = 5;
        var paginator = TestUtils.renderIntoDocument(
            <Paginator pages={amount} />
        );

        var links = TestUtils.scryRenderedDOMComponentsWithTag(
            paginator, 'a');

        expect(links.length).toEqual(amount);
    });

    it('should mark the selected page', function() {
        var amount = 5;
        var paginator = TestUtils.renderIntoDocument(
            <Paginator pages={amount} page={1} />
        );

        var selected = TestUtils.scryRenderedDOMComponentsWithClass(
            paginator, 'selected');

        expect(selected.length).toEqual(1);
    });

    it('should trigger handler on select', function() {
        var selectIndex = 2;
        var select = function(i) {
            expect(i).toEqual(selectIndex);
        };
        var paginator = TestUtils.renderIntoDocument(
            <Paginator pages={5} onSelect={select} />
        );

        var links = TestUtils.scryRenderedDOMComponentsWithTag(
            paginator, 'a');

        TestUtils.Simulate.click(links[selectIndex]);
    });
});
