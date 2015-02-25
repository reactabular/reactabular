'use strict';

jest.dontMock('../../lib/formatters/identity.js');

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

var identity = require('../../lib/formatters/identity.js');

describe('identity', function(){
    it('formats correctly', function() {
        var value = "evil olive";
        expect(identity(value)).toEqual(value);
    });
});