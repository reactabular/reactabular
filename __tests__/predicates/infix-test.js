'use strict';

jest.dontMock('../../lib/predicates/infix.js');

var infix = require('../../lib/predicates/infix.js');


describe('infix', function() {
    it('matches correctly', function() {
        var queryTerm = 'light';
        var text = 'enlighten';

        var predicate = infix(queryTerm);
        var expected = [
            {
                startIndex: 2,
                length: queryTerm.length
            }
        ];

        expect(predicate.matches(text)).toEqual(expected);
    });

    it('matches multiple correctly', function() {
        var queryTerm = 'oub';
        var text = 'double trouble';

        var predicate = infix(queryTerm);
        var expected = [
            {
                startIndex: 1,
                length: queryTerm.length
            },
            {
                startIndex: 9,
                length: queryTerm.length
            }
        ];

        expect(predicate.matches(text)).toEqual(expected);
    });

    it('does not match', function() {
        var queryTerm = 'light';
        var text = 'dark';

        var predicate = infix(queryTerm);

        expect(predicate.matches(text)).toEqual([]);
    });
});
