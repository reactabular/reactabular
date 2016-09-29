import { expect } from 'chai';
import { flatten } from '../src';

describe('tree.flatten', function () {
  it('returns an empty tree as an empty array', function () {
    expect(flatten({ tree: [] })).to.deep.equal([]);
  });

  it('returns a flattened array', function () {
    const tree = [
      {
        id: 'foobar',
        name: 'foo',
        children: [
          {
            id: 'barfoo',
            name: 'bar'
          }
        ]
      }
    ];
    const expected = [
      {
        id: 'foobar',
        name: 'foo'
      },
      {
        parent: 'foobar',
        id: 'barfoo',
        name: 'bar'
      }
    ];

    expect(flatten({ tree })).to.deep.equal(expected);
  });

  it('allows parent field to be customized', function () {
    const tree = [
      {
        id: 'foobar',
        name: 'foo',
        children: [
          {
            id: 'barfoo',
            name: 'bar'
          }
        ]
      }
    ];
    const expected = [
      {
        id: 'foobar',
        name: 'foo'
      },
      {
        p: 'foobar',
        id: 'barfoo',
        name: 'bar'
      }
    ];

    expect(flatten({ tree, parentField: 'p' })).to.deep.equal(expected);
  });


  it('allows id field to be customized', function () {
    const tree = [
      {
        _id: 'foobar',
        name: 'foo',
        children: [
          {
            _id: 'barfoo',
            name: 'bar'
          }
        ]
      }
    ];
    const expected = [
      {
        _id: 'foobar',
        name: 'foo'
      },
      {
        parent: 'foobar',
        _id: 'barfoo',
        name: 'bar'
      }
    ];

    expect(flatten({ tree, idField: '_id' })).to.deep.equal(expected);
  });

  it('returns an empty array with invalid input', function () {
    expect(flatten({ tree: 'foobar' })).to.deep.equal([]);
  });
});
