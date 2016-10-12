import { expect } from 'chai';
import { unpack } from '../src';

describe('tree.unpack', function () {
  it('returns an empty tree as an empty array', function () {
    expect(unpack()([])).to.deep.equal([]);
  });

  it('returns an unpacked array', function () {
    const rows = [
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

    expect(unpack()(rows)).to.deep.equal(expected);
  });

  it('allows parent field to be customized', function () {
    const parentField = 'p';
    const rows = [
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
        [parentField]: 'foobar',
        id: 'barfoo',
        name: 'bar'
      }
    ];

    expect(unpack({ parentField })(rows)).to.deep.equal(expected);
  });

  it('allows id field to be customized', function () {
    const idField = '_id';
    const rows = [
      {
        [idField]: 'foobar',
        name: 'foo',
        children: [
          {
            [idField]: 'barfoo',
            name: 'bar'
          }
        ]
      }
    ];
    const expected = [
      {
        [idField]: 'foobar',
        name: 'foo'
      },
      {
        parent: 'foobar',
        [idField]: 'barfoo',
        name: 'bar'
      }
    ];

    expect(unpack({ idField })(rows)).to.deep.equal(expected);
  });

  it('returns an empty array with invalid input', function () {
    expect(unpack()('foobar')).to.deep.equal([]);
  });
});
