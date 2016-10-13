import { expect } from 'chai';
import { hasChildren } from '../src';

describe('tree.hasChildren', function () {
  it('returns false if empty rows are passed', function () {
    expect(hasChildren()([])).to.deep.equal(false);
  });

  it('returns false if there are no children', function () {
    const given = [
      {
        foo: 'bar'
      }
    ];
    const expected = false;

    expect(hasChildren({ index: 0 })(given)).to.deep.equal(expected);
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

    expect(hasChildren({ index: 0 })(given)).to.deep.equal(expected);
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

    expect(hasChildren({ index: 0 })(given)).to.deep.equal(expected);
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

    expect(hasChildren({ index: 1 })(given)).to.deep.equal(expected);
  });

  it('allows parent field to be customized', function () {
    const parentField = 'demo';
    const given = [
      {
        id: 0,
        foo: 'bar'
      },
      {
        id: 1,
        [parentField]: 0,
        foo: 'foo'
      },
      {
        id: 2,
        [parentField]: 1,
        foo: 'barbar'
      }
    ];
    const expected = true;

    expect(hasChildren({ index: 1, parentField })(given)).to.deep.equal(expected);
  });

  it('allows id field to be customized', function () {
    const idField = 'demo';
    const given = [
      {
        [idField]: 0,
        foo: 'bar'
      },
      {
        [idField]: 1,
        parent: 0,
        foo: 'foo'
      },
      {
        [idField]: 2,
        parent: 1,
        foo: 'barbar'
      }
    ];
    const expected = true;

    expect(hasChildren({ index: 1, idField })(given)).to.deep.equal(expected);
  });
});
