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
        _pack: [
          {
            parent: 0,
            foo: 'foo'
          }
        ]
      }
    ];

    expect(pack()(given)).to.deep.equal(expected);
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
        _pack: [
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
      }
    ];
    // TODO: this could be made recursive
    const expected = [
      {
        id: 0,
        foo: 'bar',
        _pack: [
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
        ]
      }
    ];

    expect(pack()(given)).to.deep.equal(expected);
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
    // TODO: this could be made recursive
    const expected = [
      {
        id: 0,
        foo: 'bar',
        _pack: [
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
        ]
      }
    ];

    expect(pack({ parent: property })(given)).to.deep.equal(expected);
  });
});
