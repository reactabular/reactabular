import { expect } from 'chai';
import { pack } from '../src';

describe('tree.pack', function () {
  it('returns an empty array if empty rows are passed', function () {
    expect(pack()([])).to.deep.equal([]);
  });

  it('returns the array itself if there is nothing to pack', function () {
    const given = [
      {
        foo: 'bar'
      }
    ];

    expect(pack()(given)).to.deep.equal(given);
  });

  it('packs a single child', function () {
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
    const expected = [
      {
        id: 0,
        foo: 'bar',
        children: [
          {
            foo: 'foo'
          }
        ]
      }
    ];

    expect(pack()(given)).to.deep.equal(expected);
  });

  it('works with null parent', function () {
    const given = [
      {
        id: 0,
        foo: 'bar'
      },
      {
        parent: null,
        foo: 'foo'
      }
    ];

    expect(pack()(given)).to.deep.equal(given);
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
    const expected = [
      {
        id: 0,
        foo: 'bar',
        children: [
          {
            id: 1,
            foo: 'foo'
          },
          {
            id: 2,
            foo: 'barbar'
          }
        ]
      }
    ];

    expect(pack()(given)).to.deep.equal(expected);
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
      },
      {
        id: 3,
        parent: 1,
        foo: 'barbarbar'
      }
    ];
    const expected = [
      {
        id: 0,
        foo: 'bar',
        children: [
          {
            id: 1,
            foo: 'foo',
            children: [
              {
                id: 2,
                foo: 'barbar'
              },
              {
                id: 3,
                foo: 'barbarbar'
              }
            ]
          }
        ]
      }
    ];

    expect(pack()(given)).to.deep.equal(expected);

    // Should be immutable
    expect(pack()(given)).to.deep.equal(expected);
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
    // TODO: this could be made recursive
    const expected = [
      {
        id: 0,
        foo: 'bar',
        children: [
          {
            id: 1,
            foo: 'foo',
            children: [
              {
                id: 2,
                foo: 'barbar'
              }
            ]
          }
        ]
      }
    ];

    expect(pack({ parentField })(given)).to.deep.equal(expected);
  });

  it('allows children field to be customized', function () {
    const childrenField = 'demo';
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
    const expected = [
      {
        id: 0,
        foo: 'bar',
        [childrenField]: [
          {
            id: 1,
            foo: 'foo',
            [childrenField]: [
              {
                id: 2,
                foo: 'barbar'
              }
            ]
          }
        ]
      }
    ];

    expect(pack({ childrenField })(given)).to.deep.equal(expected);
  });

  it('returns an empty array with invalid input', function () {
    expect(pack()('foobar')).to.deep.equal([]);
  });
});
