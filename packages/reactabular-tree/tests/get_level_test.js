import { expect } from 'chai';
import { getLevel } from '../src';

describe('tree.getLevel', function () {
  it('returns zero if empty rows are passed', function () {
    expect(getLevel({ rows: [] })).to.deep.equal(0);
  });

  it('returns zero if there are no parents', function () {
    const given = [
      {
        foo: 'bar'
      }
    ];
    const expected = 0;

    expect(getLevel({ rows: given, index: 0 })).to.deep.equal(expected);
  });

  it('returns one if there is one parent', function () {
    const given = [
      {
        foo: 'bar'
      },
      {
        parent: 'baz',
        foo: 'foo'
      }
    ];
    const expected = 1;

    expect(getLevel({ rows: given, index: 1 })).to.deep.equal(expected);
  });

  it('works with sibling children', function () {
    const given = [
      {
        foo: 'bar'
      },
      {
        parent: 'baz',
        foo: 'foo'
      },
      {
        parent: 'baz',
        foo: 'barbar'
      }
    ];
    const expected = 1;

    expect(getLevel({ rows: given, index: 2 })).to.deep.equal(expected);
  });

  it('works with nested children', function () {
    const given = [
      {
        foo: 'bar'
      },
      {
        parent: 'baz',
        foo: 'foo'
      },
      {
        parent: 'foo',
        foo: 'barbar'
      }
    ];
    const expected = 2;

    expect(getLevel({ rows: given, index: 2 })).to.deep.equal(expected);
  });

  it('allows parent field to be customized', function () {
    const property = 'demo';
    const given = [
      {
        foo: 'bar'
      },
      {
        [property]: 'baz',
        foo: 'foo'
      },
      {
        [property]: 'foo',
        foo: 'barbar'
      }
    ];
    const expected = 2;

    expect(getLevel({ rows: given, index: 2, parent: property })).to.deep.equal(expected);
  });
});
