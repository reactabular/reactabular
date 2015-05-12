'use strict';

jest.dontMock('../../src/cells/identity.js');

var identity = require('../../src/cells/identity.js');


describe('identity', function(){
    it('formats correctly', function() {
        var value = 'never odd or even';

        expect(identity(value)).toEqual({
            value: value
        });
    });
});
