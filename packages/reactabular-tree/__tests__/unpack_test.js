import { unpack } from '../src';

describe('tree.unpack', function () {
  it('returns an empty tree as an empty array', function () {
    expect(unpack()([])).toEqual([]);
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
        _isParent: true,
        id: 'foobar',
        name: 'foo'
      },
      {
        parent: 'foobar',
        id: 'barfoo',
        name: 'bar'
      }
    ];

    expect(unpack()(rows)).toEqual(expected);
  });

  it('unpacks recursive structures', function () {
    const rows = [
      {
        id: 'foobar',
        name: 'foo',
        children: [
          {
            id: 'barfoo',
            name: 'bar',
            children: [
              {
                id: 'foofoo',
                name: 'zoo'
              }
            ]
          }
        ]
      }
    ];
    const expected = [
      {
        _isParent: true,
        id: 'foobar',
        name: 'foo'
      },
      {
        _isParent: true,
        parent: 'foobar',
        id: 'barfoo',
        name: 'bar'
      },
      {
        parent: 'barfoo',
        id: 'foofoo',
        name: 'zoo'
      }
    ];

    expect(unpack()(rows)).toEqual(expected);
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
        _isParent: true,
        id: 'foobar',
        name: 'foo'
      },
      {
        [parentField]: 'foobar',
        id: 'barfoo',
        name: 'bar'
      }
    ];

    expect(unpack({ parentField })(rows)).toEqual(expected);
  });

  it('allows parent field to be customized', function () {
    const childrenField = 'c';
    const rows = [
      {
        id: 'foobar',
        name: 'foo',
        [childrenField]: [
          {
            id: 'barfoo',
            name: 'bar'
          }
        ]
      }
    ];
    const expected = [
      {
        _isParent: true,
        id: 'foobar',
        name: 'foo'
      },
      {
        parent: 'foobar',
        id: 'barfoo',
        name: 'bar'
      }
    ];

    expect(unpack({ childrenField })(rows)).toEqual(expected);
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
        _isParent: true,
        [idField]: 'foobar',
        name: 'foo'
      },
      {
        parent: 'foobar',
        [idField]: 'barfoo',
        name: 'bar'
      }
    ];

    expect(unpack({ idField })(rows)).toEqual(expected);
  });

  it('returns an empty array with invalid input', function () {
    expect(unpack()('foobar')).toEqual([]);
  });
});
