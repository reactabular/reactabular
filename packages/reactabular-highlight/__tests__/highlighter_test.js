import { expect } from 'chai';
import * as search from '../../reactabular-search/src';
import * as highlight from '../src';

describe('highlight.highlighter', function () {
  it('highlights using matches', function () {
    const columns = [
      {
        property: 'name'
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

  it('retains original data', function () {
    const columns = [
      {
        property: 'name'
      }
    ];
    const rows = [
      { name: 'demo', id: 5 },
      { name: 'another', id: 10 }
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
        name: 'demo',
        id: 5
      },
      {
        _highlights: {
          name: []
        },
        name: 'another',
        id: 10
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
        property: 'name'
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

  it('passes empty cells through', function () {
    const columns = [
      {
        cell: {
          format: a => a
        }
      }
    ];
    const rows = [
      { name: 'demo', _age: 13 },
      { name: 'another' }
    ];
    const expected = [
      {
        name: 'demo',
        _age: 13,
        _highlights: {}
      },
      {
        name: 'another',
        _highlights: {}
      }
    ];
    const result = highlight.highlighter({
      columns,
      matches: search.matches,
      query: {
        name: 'demo'
      }
    })(rows);

    expect(JSON.stringify(result)).to.equal(JSON.stringify(expected));

    // XXX: why this fails?
    // expect(result).to.deep.equal(expected);
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
        property: 'name',
        cell: {
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
        property: 'name',
        cell: {
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
