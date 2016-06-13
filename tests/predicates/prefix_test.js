import prefix from '../../src/predicates/prefix.js';
import { expect } from 'chai';

describe('prefix', function () {
  it('matches correctly', function () {
    const queryTerm = 'lay';
    const text = 'layout';

    const predicate = prefix(queryTerm);
    const expected = [{
      startIndex: 0,
      length: queryTerm.length,
    }];

    expect(predicate.evaluate(text)).to.equal(true);
    expect(predicate.matches(text)).to.deep.equal(expected);
  });

  it('does not match', function () {
    const queryTerm = 'lay';
    const text = 'outlay';

    const predicate = prefix(queryTerm);

    expect(predicate.evaluate(text)).to.equal(false);
    expect(predicate.matches(text)).to.be.empty;
  });
});
