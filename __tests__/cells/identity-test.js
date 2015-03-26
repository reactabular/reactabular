'use strict';

jest.dontMock('../../lib/cells/identity.js');

var identity = require('../../lib/cells/identity.js');


describe('identity', function(){
    it('formats correctly', function() {
        var value = 'never odd or even';

        expect(identity(value)).toEqual({
            value: value
        });
    });
});
