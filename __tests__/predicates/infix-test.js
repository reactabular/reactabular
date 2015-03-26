'use strict';

jest.dontMock('../../lib/predicates/infix.js');

var infix = require('../../lib/predicates/infix.js');


describe('infix', function() {
    it('matches correctly', function() {
        var queryTerm = 'light';
        var text = 'enlighten';

        var predicate = infix(queryTerm);

        expect(predicate.matches(text)).toEqual(true);
    });

    it('does not match', function() {
        var queryTerm = 'light';
        var text = 'dark';

        var predicate = infix(queryTerm);

        expect(predicate.matches(text)).toEqual(false);
    });
});
