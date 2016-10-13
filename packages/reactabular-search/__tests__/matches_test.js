import { expect } from 'chai';
import { matches, strategies } from '../src';

describe('search.matches', function () {
  it('matches infix by default', function () {
    const query = 'oba';
    const result = matches({
      value: 'foobar',
      query
    });
    const expected = [
      {
        startIndex: 2,
        length: query.length
      }
    ];

    expect(result).to.deep.equal(expected);
  });

  it('matches case-insensitively by default', function () {
    const query = 'foo';
    const result = matches({
      value: 'FOOBAR',
      query
    });
    const expected = [
      {
        startIndex: 0,
        length: query.length
      }
    ];

    expect(result).to.deep.equal(expected);
  });

  it('allows changing strategy', function () {
    const query = 'foo';
    const result = matches({
      value: 'foobar',
      query,
      strategy: strategies.prefix
    });
    const expected = [
      {
        startIndex: 0,
        length: query.length
      }
    ];

    expect(result).to.deep.equal(expected);
  });

  it('allows changing transform', function () {
    const query = 'foo';
    const result = matches({
      value: 'FOOBAR',
      query,
      transform: a => a
    });
    const expected = [];

    expect(result).to.deep.equal(expected);
  });

  it('does not crash without parameters', function () {
    const result = matches();

    expect(result).to.deep.equal({});
  });

  it('does not crash with undefined value', function () {
    const result = matches({
      value: undefined,
      query: 'foo'
    });

    expect(result).to.deep.equal([]);
  });
});
