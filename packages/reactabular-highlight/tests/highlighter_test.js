import { expect } from 'chai';
import * as search from '../../reactabular-search';
import * as highlight from '../';

describe('highlight.highlighter', function () {
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
    const result = highlight.highlighter({
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
          property: 'name'
        }
      }
    ];
    const rows = [
      { name: 'demo', _name: 'demodemo' },
      { name: 'another', _name: 'anotheranother' }
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
        name: 'demo',
        _name: 'demodemo'
      },
      {
        _highlights: {
          name: []
        },
        name: 'another',
        _name: 'anotheranother'
      }
    ];
    const result = highlight.highlighter({
      columns,
      matches: search.matches,
      query: {
        name: 'demo'
      }
    })(rows);

    expect(result).to.deep.equal(expected);
  });

  it('throws an error if columns are not passed', function () {
    expect(highlight.highlighter.bind(null, {
      matches: search.matches,
      query: {
        name: 'demo'
      }
    })).to.throw(Error);
  });

  it('throws an error if matches are not passed', function () {
    const columns = [
      {
        cell: {
          property: 'name',
          resolve: v => v + v
        }
      }
    ];

    expect(highlight.highlighter.bind(null, {
      columns,
      query: {
        name: 'demo'
      }
    })).to.throw(Error);
  });

  it('throws an error if query is not passed', function () {
    const columns = [
      {
        cell: {
          property: 'name',
          resolve: v => v + v
        }
      }
    ];

    expect(highlight.highlighter.bind(null, {
      columns,
      matches: search.matches
    })).to.throw(Error);
  });
});
