'use strict';

var infix = require('../../src/predicates/infix.js');

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

        expect(predicate.evaluate(text)).to.equal(true);
        expect(predicate.matches(text)).to.deep.equal(expected);
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

        expect(predicate.evaluate(text)).to.equal(true);
        expect(predicate.matches(text)).to.deep.equal(expected);
    });

    it('does not match', function() {
        var queryTerm = 'light';
        var text = 'dark';

        var predicate = infix(queryTerm);

        expect(predicate.evaluate(text)).to.equal(false);
        expect(predicate.matches(text)).to.be.empty;
    });
});
