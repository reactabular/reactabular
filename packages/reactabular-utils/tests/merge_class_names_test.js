import { expect } from 'chai';
import { mergeClassNames } from '../src';

describe('utils.mergeClassNames', function () {
  it('merges two', function () {
    const a = 'foo';
    const b = 'bar';
    const expected = `${a} ${b}`;

    expect(mergeClassNames(a, b)).to.equal(expected);
  });

  it('merges one', function () {
    const a = 'foo';
    const b = '';
    const expected = `${a}`;

    expect(mergeClassNames(a, b)).to.equal(expected);
  });

  it('merges none', function () {
    const a = '';
    const b = '';
    const expected = '';

    expect(mergeClassNames(a, b)).to.equal(expected);
  });
});
