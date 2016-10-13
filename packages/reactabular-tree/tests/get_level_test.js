import { expect } from 'chai';
import { getLevel } from '../src';

describe('tree.getLevel', function () {
  it('returns zero if empty rows are passed', function () {
    expect(getLevel()([])).to.deep.equal(0);
  });

  it('returns zero if there are no parents', function () {
    const given = [
      {
        foo: 'bar'
      }
    ];
    const expected = 0;

    expect(getLevel({ index: 0 })(given)).to.deep.equal(expected);
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

    expect(getLevel({ index: 1 })(given)).to.deep.equal(expected);
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

    expect(getLevel({ index: 2 })(given)).to.deep.equal(expected);
  });

  it('works with sibling children without parents', function () {
    const given = [
      {
        foo: 'bar'
      },
      {
        foo: 'foo'
      }
    ];
    const expected = 0;

    expect(getLevel({ index: 1 })(given)).to.deep.equal(expected);
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

    expect(getLevel({ index: 2 })(given)).to.deep.equal(expected);
  });

  it('allows parent field to be customized', function () {
    const parentField = 'demo';
    const given = [
      {
        foo: 'bar'
      },
      {
        [parentField]: 'baz',
        foo: 'foo'
      },
      {
        [parentField]: 'foo',
        foo: 'barbar'
      }
    ];
    const expected = 2;

    expect(getLevel({ index: 2, parentField })(given)).to.deep.equal(expected);
  });
});
