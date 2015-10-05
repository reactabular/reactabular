'use strict';

var prefix = require('../../src/predicates/prefix.js');

describe('prefix', function() {
    it('matches correctly', function() {
        var queryTerm = 'lay';
        var text = 'layout';

        var predicate = prefix(queryTerm);
        var expected = [{
            startIndex: 0,
            length: queryTerm.length
        }];

        expect(predicate.evaluate(text)).to.equal(true);
        expect(predicate.matches(text)).to.deep.equal(expected);
    });

    it('does not match', function() {
        var queryTerm = 'lay';
        var text = 'outlay';

        var predicate = prefix(queryTerm);

        expect(predicate.evaluate(text)).to.equal(false);
        expect(predicate.matches(text)).to.be.empty;
    });
});
