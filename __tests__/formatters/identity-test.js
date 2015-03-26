'use strict';

jest.dontMock('../../lib/formatters/identity.js');

var identity = require('../../lib/formatters/identity.js');


describe('identity', function(){
    it('formats correctly', function() {
        var value = 'evil olive';

        expect(identity(value)).toEqual(value);
    });
});
