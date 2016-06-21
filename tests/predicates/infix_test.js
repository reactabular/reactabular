import infix from '../../src/predicates/infix';
import { expect } from 'chai';

describe('infix', function () {
  it('matches correctly', function () {
    const queryTerm = 'light';
    const text = 'enlighten';

    const predicate = infix(queryTerm);
    const expected = [
      {
        startIndex: 2,
        length: queryTerm.length,
      },
    ];

    expect(predicate.evaluate(text)).to.equal(true);
    expect(predicate.matches(text)).to.deep.equal(expected);
  });

  it('matches multiple correctly', function () {
    const queryTerm = 'oub';
    const text = 'double trouble';

    const predicate = infix(queryTerm);
    const expected = [
      {
        startIndex: 1,
        length: queryTerm.length,
      },
      {
        startIndex: 9,
        length: queryTerm.length,
      },
    ];

    expect(predicate.evaluate(text)).to.equal(true);
    expect(predicate.matches(text)).to.deep.equal(expected);
  });

  it('does not match', function () {
    const queryTerm = 'light';
    const text = 'dark';

    const predicate = infix(queryTerm);

    expect(predicate.evaluate(text)).to.equal(false);
    expect(predicate.matches(text)).to.be.empty;
  });
});
