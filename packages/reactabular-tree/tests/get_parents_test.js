import { expect } from 'chai';
import { getParents } from '../src';

describe('tree.getParents', function () {
  it('returns an empty array if empty rows are passed', function () {
    expect(getParents({ rows: [] })).to.deep.equal([]);
  });

  it('returns an empty array if there are no parents', function () {
    const given = [
      {
        foo: 'bar'
      }
    ];
    const expected = [];

    expect(getParents({ rows: given, index: 0 })).to.deep.equal(expected);
  });

  it('returns an array with parent if there is one parent', function () {
    const given = [
      {
        foo: 'bar'
      },
      {
        parent: 'baz',
        foo: 'foo'
      }
    ];
    const expected = [
      {
        foo: 'bar'
      }
    ];

    expect(getParents({ rows: given, index: 1 })).to.deep.equal(expected);
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
    const expected = [
      {
        foo: 'bar'
      }
    ];

    expect(getParents({ rows: given, index: 2 })).to.deep.equal(expected);
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
    const expected = [
      {
        foo: 'bar'
      },
      {
        parent: 'baz',
        foo: 'foo'
      }
    ];

    expect(getParents({ rows: given, index: 2 })).to.deep.equal(expected);
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
    const expected = [
      {
        foo: 'bar'
      },
      {
        [property]: 'baz',
        foo: 'foo'
      }
    ];

    expect(getParents({
      rows: given, index: 2, parent: property
    })).to.deep.equal(expected);
  });
});
