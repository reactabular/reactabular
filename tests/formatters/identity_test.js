'use strict';

var identity = require('../../src/formatters/identity.js');

describe('identity', function(){
    it('formats correctly', function() {
        var value = 'evil olive';

        expect(identity(value)).to.equal(value);
    });
});
