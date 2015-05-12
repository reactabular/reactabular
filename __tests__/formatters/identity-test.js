'use strict';

jest.dontMock('../../src/formatters/identity.js');

var identity = require('../../src/formatters/identity.js');


describe('identity', function(){
    it('formats correctly', function() {
        var value = 'evil olive';

        expect(identity(value)).toEqual(value);
    });
});
