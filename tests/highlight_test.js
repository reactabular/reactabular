import { expect } from 'chai';
import { highlight, search } from '../src';

describe('highlight', function () {
  it('sorts ascending by default', function () {
    const columns = [
      {
        cell: {
          property: 'name'
        }
      }
    ];
    const rows = [
      { name: 'demo' },
      { name: 'another' }
    ];
    const expected = [
      {
        _highlights: {
          name: [
            {
              startIndex: 0,
              length: 4
            }
          ]
        },
        name: 'demo'
      },
      {
        _highlights: {
          name: []
        },
        name: 'another'
      }
    ];
    const result = highlight({
      columns,
      matches: search.matches,
      query: {
        name: 'demo'
      }
    })(rows);

    expect(result).to.deep.equal(expected);
  });

  it('highlights resolved values', function () {
    const columns = [
      {
        cell: {
          property: 'name',
          resolve: v => v + v
        }
      }
    ];
    const rows = [
      { name: 'demo' },
      { name: 'another' }
    ];
    const expected = [
      {
        _highlights: {
          name: [
            {
              startIndex: 0,
              length: 4
            },
            {
              startIndex: 4,
              length: 4
            }
          ]
        },
        name: 'demo'
      },
      {
        _highlights: {
          name: []
        },
        name: 'another'
      }
    ];
    const result = highlight({
      columns,
      matches: search.matches,
      query: {
        name: 'demo'
      }
    })(rows);

    expect(result).to.deep.equal(expected);
  });
});
