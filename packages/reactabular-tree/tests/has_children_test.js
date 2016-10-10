import { expect } from 'chai';
import { hasChildren } from '../src';

describe('tree.hasChildren', function () {
  it('returns false if empty rows are passed', function () {
    expect(hasChildren({ rows: [] })).to.deep.equal(false);
  });

  it('returns false if there are no children', function () {
    const given = [
      {
        foo: 'bar'
      }
    ];
    const expected = false;

    expect(hasChildren({ rows: given, index: 0 })).to.deep.equal(expected);
  });

  it('returns true if there is one child', function () {
    const given = [
      {
        id: 0,
        foo: 'bar'
      },
      {
        parent: 0,
        foo: 'foo'
      }
    ];
    const expected = true;

    expect(hasChildren({ rows: given, index: 0 })).to.deep.equal(expected);
  });

  it('works with sibling children', function () {
    const given = [
      {
        id: 0,
        foo: 'bar'
      },
      {
        id: 1,
        parent: 0,
        foo: 'foo'
      },
      {
        id: 2,
        parent: 0,
        foo: 'barbar'
      }
    ];
    const expected = true;

    expect(hasChildren({ rows: given, index: 0 })).to.deep.equal(expected);
  });

  it('works with nested children', function () {
    const given = [
      {
        id: 0,
        foo: 'bar'
      },
      {
        id: 1,
        parent: 0,
        foo: 'foo'
      },
      {
        id: 2,
        parent: 1,
        foo: 'barbar'
      }
    ];
    const expected = true;

    expect(hasChildren({ rows: given, index: 1 })).to.deep.equal(expected);
  });

  it('allows parent field to be customized', function () {
    const property = 'demo';
    const given = [
      {
        id: 0,
        foo: 'bar'
      },
      {
        id: 1,
        [property]: 0,
        foo: 'foo'
      },
      {
        id: 2,
        [property]: 1,
        foo: 'barbar'
      }
    ];
    const expected = true;

    expect(hasChildren({
      rows: given, index: 1, parent: property
    })).to.deep.equal(expected);
  });

  it('allows id field to be customized', function () {
    const property = 'demo';
    const given = [
      {
        [property]: 0,
        foo: 'bar'
      },
      {
        [property]: 1,
        parent: 0,
        foo: 'foo'
      },
      {
        [property]: 2,
        parent: 1,
        foo: 'barbar'
      }
    ];
    const expected = true;

    expect(hasChildren({
      rows: given, index: 1, id: property
    })).to.deep.equal(expected);
  });
});
