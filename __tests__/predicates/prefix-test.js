'use strict';

jest.dontMock('../../lib/predicates/prefix.js');

var prefix = require('../../lib/predicates/prefix.js');


describe('prefix', function() {
    it('matches correctly', function() {
        var queryTerm = 'lay';
        var text = 'layout';

        var predicate = prefix(queryTerm);

        expect(predicate.matches(text)).toEqual(true);
    });

    it('does not match', function() {
        var queryTerm = 'lay';
        var text = 'outlay';

        var predicate = prefix(queryTerm);

        expect(predicate.matches(text)).toEqual(false);
    });
});
