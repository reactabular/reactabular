import { expect } from 'chai';
import { highlight, search } from '../src';

describe('highlight', function () {
  it('sorts ascending by default', function () {
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
      matches: search.matches,
      query: {
        name: 'demo'
      }
    })(rows);

    expect(result).to.deep.equal(expected);
  });
});
