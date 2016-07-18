import { expect } from 'chai';
import { search } from '../src';

const {
  multipleColumns, singleColumn,
  strategies: { infix, prefix }, _columnMatches, matches
} = search;

describe('search.multipleColumns', function () {
  it('matches all', function () {
    const query = { demo: 'foo' };
    const rows = [{ demo: 'foobar' }, { demo: 'foofoo' }];
    const result = multipleColumns({
      query,
      columns: [
        { cell: { property: 'demo' } }
      ]
    })(rows);

    expect(result).to.deep.equal(rows);
  });

  it('matches some', function () {
    const query = { demo: 'foo' };
    const match = { demo: 'foobar' };
    const rows = [match, { demo: 'zappa' }];
    const result = multipleColumns({
      query,
      columns: [
        { cell: { property: 'demo' } }
      ]
    })(rows);

    expect(result).to.deep.equal([match]);
  });

  it('does not match from other column', function () {
    const query = { demo: 'foo' };
    const match = { demo: 'foobar' };
    const rows = [match, { demo: 'bar', another: 'foobar' }];
    const result = multipleColumns({
      query,
      columns: [
        { cell: { property: 'demo' } },
        { cell: { property: 'another' } }
      ]
    })(rows);

    expect(result).to.deep.equal([match]);
  });

  it('matches none', function () {
    const query = { demo: 'foo' };
    const rows = [{ demo: 'barbar' }, { demo: 'zappa' }];
    const result = multipleColumns({
      query,
      columns: [
        { cell: { property: 'demo' } }
      ]
    })(rows);

    expect(result).to.deep.equal([]);
  });

  it('returns all rows without a query', function () {
    const rows = [{ demo: 'foobar' }, { demo: 'zappa' }];
    const result = multipleColumns({
      columns: [
        { cell: { property: 'demo' } }
      ]
    })(rows);

    expect(result).to.deep.equal(rows);
  });
});

describe('search.singleColumn', function () {
  it('matches searched column', function () {
    const query = 'foo';
    const rows = [{ demo: 'foobar' }];
    const result = singleColumn({
      query,
      columns: [
        { cell: { property: 'demo' } }
      ],
      searchColumn: 'demo'
    })(rows);

    expect(result).to.deep.equal(rows);
  });

  it('matches some', function () {
    const query = 'foo';
    const rows = { demo: 'foobar' };
    const result = singleColumn({
      query,
      columns: [
        { cell: { property: 'demo' } }
      ]
    })([
      rows,
      { demo: 'zapzap' }
    ]);

    expect(result).to.deep.equal([rows]);
  });

  it('matches none', function () {
    const query = 'foo';
    const rows = { demo: 'zapzap' };
    const result = singleColumn({
      query,
      columns: [
        { cell: { property: 'demo' } }
      ]
    })([
      rows
    ]);

    expect(result).to.deep.equal([]);
  });

  it('matches against all columns', function () {
    const query = 'foo';
    const rows = [{ demo: 'foobar' }];
    const result = singleColumn({
      query,
      columns: [
        { cell: { property: 'demo' } }
      ],
      searchColumn: 'all'
    })(rows);

    expect(result).to.deep.equal(rows);
  });

  it('matches against all columns by default', function () {
    const query = 'foo';
    const rows = [{ demo: 'foobar' }];
    const result = singleColumn({
      query,
      columns: [
        { cell: { property: 'demo' } }
      ],
      searchColumn: 'all'
    })(rows);

    expect(result).to.deep.equal(rows);
  });

  it('returns all rows without a query', function () {
    const rows = [{ demo: 'foobar' }];
    const result = singleColumn({
      columns: [
        { cell: { property: 'demo' } }
      ]
    })(rows);

    expect(result).to.deep.equal(rows);
  });
});

describe('search._columnMatches', function () {
  it('returns matching query', function () {
    const query = 'foo';
    const result = _columnMatches({
      query,
      column: { cell: { property: 'demo' } },
      row: { demo: 'foobar' }
    });

    expect(result).to.equal(true);
  });

  it('does not return missing query', function () {
    const query = 'zoo';
    const result = _columnMatches({
      query,
      column: { cell: { property: 'demo' } },
      row: { demo: 'foobar' }
    });

    expect(result).to.equal(false);
  });

  it('accepts alternative strategy', function () {
    const query = 'oba';
    const result = _columnMatches({
      query,
      column: { cell: { property: 'demo' } },
      row: { demo: 'foobar' },
      strategy: prefix
    });

    expect(result).to.equal(false);
  });

  it('accepts alternative transform', function () {
    const query = 'oba';
    const result = _columnMatches({
      query,
      column: { cell: { property: 'demo' } },
      row: { demo: 'foobar' },
      transform: v => v
    });

    expect(result).to.equal(true);
  });

  it('does not parse nested property', function () {
    const query = 'foo';
    const result = _columnMatches({
      query,
      column: { cell: { property: 'demo.another' } },
      row: { demo: { another: 'foobar' }, 'demo.another': 'foobar' }
    });

    expect(result).to.equal(true);
  });

  it('formats property', function () {
    const query = 'foo';
    const result = _columnMatches({
      query,
      column: { cell: { property: 'demo' } },
      row: { demo: 'foobar', _demo: 'FOOBAR' },
      transform: v => v
    });

    expect(result).to.equal(false);
  });

  it('is not visible without a valid value', function () {
    const query = 'foo';
    const result = _columnMatches({
      query,
      column: { cell: { property: 'demo' } },
      row: { demo: ['bar'] },
      transform: v => v
    });

    expect(result).to.equal(false);
  });

  it('is not visible with undefined', function () {
    const query = 'foo';
    const result = _columnMatches({
      query,
      column: { cell: { property: 'demo' } },
      row: { demo: undefined },
      transform: v => v
    });

    expect(result).to.equal(false);
  });

  it('does not crash with undefined rows', function () {
    const query = 'foo';
    const result = _columnMatches({
      query,
      column: { cell: { property: 'demo' } },
      row: { demo: undefined },
      transform: v => v
    });

    expect(result).to.equal(false);
  });

  it('does not crash with a number', function () {
    const query = 'foo';
    const result = _columnMatches({
      query,
      column: { cell: { property: 'demo' } },
      row: { demo: 22 },
      transform: v => v
    });

    expect(result).to.equal(false);
  });

  it('does not crash with null rows', function () {
    const query = 'foo';
    const result = _columnMatches({
      query,
      column: { cell: { property: 'demo' } },
      row: { demo: null },
      transform: v => v
    });

    expect(result).to.equal(false);
  });

  it('does not crash if value is false', function () {
    const query = 'foo';
    const result = _columnMatches({
      query,
      column: { cell: { property: 'demo' } },
      row: { demo: false }
    });

    expect(result).to.equal(false);
  });

  it('does not crash if transformed to undefined', function () {
    const query = 'foo';
    const result = _columnMatches({
      query,
      column: { cell: { property: 'demo' } },
      row: { demo: 'foobar' },
      resolve: () => undefined
    });

    expect(result).to.equal(true);
  });

  it('does not crash if transformed to null', function () {
    const query = 'foo';
    const result = _columnMatches({
      query,
      column: { cell: { property: 'demo' } },
      row: { demo: 'foobar' },
      resolve: () => null
    });

    expect(result).to.equal(true);
  });

  it('does not crash without column', function () {
    const query = 'foo';
    const result = _columnMatches({
      query,
      row: { demo: 'foobar' }
    });

    expect(result).to.equal(false);
  });

  it('does not crash if transformed to false', function () {
    const query = 'foo';
    const result = _columnMatches({
      query,
      column: { cell: { property: 'demo' } },
      row: { demo: 'foobar' },
      resolve: () => null
    });

    expect(result).to.equal(true);
  });
});

describe('search.matches', function () {
  it('matches infix by default', function () {
    const query = 'oba';
    const result = matches({
      value: 'foobar',
      query
    });
    const expected = [
      {
        startIndex: 2,
        length: query.length
      }
    ];

    expect(result).to.deep.equal(expected);
  });

  it('matches case-insensitively by default', function () {
    const query = 'foo';
    const result = matches({
      value: 'FOOBAR',
      query
    });
    const expected = [
      {
        startIndex: 0,
        length: query.length
      }
    ];

    expect(result).to.deep.equal(expected);
  });

  it('allows changing strategy', function () {
    const query = 'foo';
    const result = matches({
      value: 'foobar',
      query,
      strategy: prefix
    });
    const expected = [
      {
        startIndex: 0,
        length: query.length
      }
    ];

    expect(result).to.deep.equal(expected);
  });

  it('allows changing transform', function () {
    const query = 'foo';
    const result = matches({
      value: 'FOOBAR',
      query,
      transform: a => a
    });
    const expected = [];

    expect(result).to.deep.equal(expected);
  });

  it('does not crash without parameters', function () {
    const result = matches();

    expect(result).to.deep.equal({});
  });

  it('does not crash with undefined value', function () {
    const result = matches({
      value: undefined,
      query: 'foo'
    });

    expect(result).to.deep.equal([]);
  });
});

describe('search.strategies.infix', function () {
  it('matches correctly', function () {
    const queryTerm = 'light';
    const text = 'enlighten';

    const predicate = infix(queryTerm);
    const expected = [
      {
        startIndex: 2,
        length: queryTerm.length
      }
    ];

    expect(predicate.evaluate(text)).to.equal(true);
    expect(predicate.matches(text)).to.deep.equal(expected);
  });

  it('matches multiple correctly', function () {
    const queryTerm = 'oub';
    const text = 'double trouble';

    const predicate = infix(queryTerm);
    const expected = [
      {
        startIndex: 1,
        length: queryTerm.length
      },
      {
        startIndex: 9,
        length: queryTerm.length
      }
    ];

    expect(predicate.evaluate(text)).to.equal(true);
    expect(predicate.matches(text)).to.deep.equal(expected);
  });

  it('does not match', function () {
    const queryTerm = 'light';
    const text = 'dark';

    const predicate = infix(queryTerm);

    expect(predicate.evaluate(text)).to.equal(false);
    expect(predicate.matches(text)).to.be.empty;
  });
});

describe('search.strategies.prefix', function () {
  it('matches correctly', function () {
    const queryTerm = 'lay';
    const text = 'layout';

    const predicate = prefix(queryTerm);
    const expected = [{
      startIndex: 0,
      length: queryTerm.length
    }];

    expect(predicate.evaluate(text)).to.equal(true);
    expect(predicate.matches(text)).to.deep.equal(expected);
  });

  it('does not match', function () {
    const queryTerm = 'lay';
    const text = 'outlay';

    const predicate = prefix(queryTerm);

    expect(predicate.evaluate(text)).to.equal(false);
    expect(predicate.matches(text)).to.be.empty;
  });
});
