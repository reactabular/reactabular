import { expect } from 'chai';
import { unpack } from '../src';

describe('tree.unpack', function () {
  it('returns an empty array if empty rows are passed', function () {
    expect(unpack([])).to.deep.equal([]);
  });

  it('returns the array itself if there is nothing to unpack', function () {
    const given = [
      {
        foo: 'bar'
      }
    ];

    expect(unpack(given)).to.deep.equal(given);
  });

  it('unpacks a single child', function () {
    const given = [
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
    const expected = [
      {
        id: 0,
        foo: 'bar'
      },
      {
        parent: 0,
        foo: 'foo'
      }
    ];

    expect(unpack(given)).to.deep.equal(expected);
  });

  it('works with sibling children', function () {
    const given = [
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
    const expected = [
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

    expect(unpack(given)).to.deep.equal(expected);
  });

  it('works with nested children', function () {
    // TODO: this could be made recursive
    const given = [
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
    const expected = [
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

    expect(unpack(given)).to.deep.equal(expected);
  });

  // TODO
  /*
  it('allows parent field to be customized', function () {
    const property = 'demo';
    // TODO: this could be made recursive
    const given = [
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
    const expected = [
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

    expect(unpack({ parent: property })(given)).to.deep.equal(expected);
  });
  */
});
