'use strict';

jest.dontMock('../../lib/cells/identity.js');

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

var identity = require('../../lib/cells/identity.js');

describe('identity', function(){
    it('formats correctly', function() {
        var value = "never odd or even";
        var formatted = "Never odd or even";

        expect(identity({
            original: value,
            formatted: formatted
        })).toEqual({value: formatted});
    });
});