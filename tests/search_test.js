import { expect } from 'chai';
import { search } from '../src';

const {
  multipleColumns, singleColumn,
  predicates: { infix, prefix }, columnMatches, matches,
} = search;

describe('search.multipleColumns', function () {
  it('matches all', function () {
    const query = { demo: 'foo' };
    const data = [{ demo: 'foobar' }, { demo: 'foofoo' }];
    const result = multipleColumns({
      data,
      query,
      columns: [
        { cell: { property: 'demo' } },
      ],
    });

    expect(result).to.deep.equal(data);
  });

  it('matches some', function () {
    const query = { demo: 'foo' };
    const match = { demo: 'foobar' };
    const data = [match, { demo: 'zappa' }];
    const result = multipleColumns({
      data,
      query,
      columns: [
        { cell: { property: 'demo' } },
      ],
    });

    expect(result).to.deep.equal([match]);
  });

  it('matches none', function () {
    const query = { demo: 'foo' };
    const data = [{ demo: 'barbar' }, { demo: 'zappa' }];
    const result = multipleColumns({
      data,
      query,
      columns: [
        { cell: { property: 'demo' } },
      ],
    });

    expect(result).to.deep.equal([]);
  });

  it('returns all data without a query', function () {
    const data = [{ demo: 'foobar' }, { demo: 'zappa' }];
    const result = multipleColumns({
      data,
      columns: [
        { cell: { property: 'demo' } },
      ],
    });

    expect(result).to.deep.equal(data);
  });
});

describe('search.singleColumn', function () {
  it('matches searched column', function () {
    const query = 'foo';
    const data = [{ demo: 'foobar' }];
    const result = singleColumn({
      data,
      query,
      columns: [
        { cell: { property: 'demo' } },
      ],
      searchColumn: 'demo',
    });

    expect(result).to.deep.equal(data);
  });

  it('matches some', function () {
    const query = 'foo';
    const data = { demo: 'foobar' };
    const result = singleColumn({
      data: [
        data,
        { demo: 'zapzap' },
      ],
      query,
      columns: [
        { cell: { property: 'demo' } },
      ],
    });

    expect(result).to.deep.equal([data]);
  });

  it('matches none', function () {
    const query = 'foo';
    const data = { demo: 'zapzap' };
    const result = singleColumn({
      data: [
        data,
      ],
      query,
      columns: [
        { cell: { property: 'demo' } },
      ],
    });

    expect(result).to.deep.equal([]);
  });

  it('matches against all columns', function () {
    const query = 'foo';
    const data = [{ demo: 'foobar' }];
    const result = singleColumn({
      data,
      query,
      columns: [
        { cell: { property: 'demo' } },
      ],
      searchColumn: 'all',
    });

    expect(result).to.deep.equal(data);
  });

  it('matches against all columns by default', function () {
    const query = 'foo';
    const data = [{ demo: 'foobar' }];
    const result = singleColumn({
      data,
      query,
      columns: [
        { cell: { property: 'demo' } },
      ],
      searchColumn: 'all',
    });

    expect(result).to.deep.equal(data);
  });

  it('returns all data without a query', function () {
    const data = [{ demo: 'foobar' }];
    const result = singleColumn({
      data,
      columns: [
        { cell: { property: 'demo' } },
      ],
    });

    expect(result).to.deep.equal(data);
  });
});

describe('search.columnMatches', function () {
  it('returns matching query', function () {
    const query = 'foo';
    const result = columnMatches({
      query,
      column: { cell: { property: 'demo' } },
      row: { demo: 'foobar' },
    });
    const expected = [
      {
        startIndex: 0,
        length: query.length,
      },
    ];

    expect(result).to.deep.equal(expected);
  });

  it('does not return missing query', function () {
    const query = 'zoo';
    const result = columnMatches({
      query,
      column: { cell: { property: 'demo' } },
      row: { demo: 'foobar' },
    });
    const expected = [];

    expect(result).to.deep.equal(expected);
  });

  it('accepts alternative strategy', function () {
    const query = 'oba';
    const result = columnMatches({
      query,
      column: { cell: { property: 'demo' } },
      row: { demo: 'foobar' },
      strategy: prefix,
    });

    expect(result).to.deep.equal([]);
  });

  it('accepts alternative transform', function () {
    const query = 'oba';
    const result = columnMatches({
      query,
      column: { cell: { property: 'demo' } },
      row: { demo: 'foobar' },
      transform: v => v,
    });
    const expected = [
      {
        startIndex: 2,
        length: 3,
      },
    ];

    expect(result).to.deep.equal(expected);
  });

  it('parses nested property', function () {
    const query = 'foo';
    const result = columnMatches({
      query,
      column: { cell: { property: 'demo.another' } },
      row: { demo: { another: 'foobar' } },
    });
    const expected = [
      {
        startIndex: 0,
        length: query.length,
      },
    ];

    expect(result).to.deep.equal(expected);
  });

  it('formats property', function () {
    const query = 'foo';
    const result = columnMatches({
      query,
      column: { cell: { property: 'demo', value: a => a.toUpperCase() } },
      row: { demo: 'foobar' },
      transform: v => v,
    });
    const expected = [];

    expect(result).to.deep.equal(expected);
  });

  it('is not visible without a valid value', function () {
    const query = 'foo';
    const result = columnMatches({
      query,
      column: { cell: { property: 'demo' } },
      row: { demo: ['bar'] },
      transform: v => v,
    });
    const expected = [];

    expect(result).to.deep.equal(expected);
  });

  it('is not visible with undefined', function () {
    const query = 'foo';
    const result = columnMatches({
      query,
      column: { cell: { property: 'demo' } },
      row: { demo: undefined },
      transform: v => v,
    });
    const expected = [];

    expect(result).to.deep.equal(expected);
  });
});

describe('search.matches', function () {
  it('matches infix by default', function () {
    const query = 'oba';
    const result = matches({
      value: 'foobar',
      query,
    });
    const expected = [
      {
        startIndex: 2,
        length: query.length,
      },
    ];

    expect(result).to.deep.equal(expected);
  });

  it('matches case-insensitively by default', function () {
    const query = 'foo';
    const result = matches({
      value: 'FOOBAR',
      query,
    });
    const expected = [
      {
        startIndex: 0,
        length: query.length,
      },
    ];

    expect(result).to.deep.equal(expected);
  });

  it('allows changing strategy', function () {
    const query = 'foo';
    const result = matches({
      value: 'foobar',
      query,
      strategy: prefix,
    });
    const expected = [
      {
        startIndex: 0,
        length: query.length,
      },
    ];

    expect(result).to.deep.equal(expected);
  });

  it('allows changing transform', function () {
    const query = 'foo';
    const result = matches({
      value: 'FOOBAR',
      query,
      transform: a => a,
    });
    const expected = [];

    expect(result).to.deep.equal(expected);
  });

  it('does not crash without parameters', function () {
    const result = matches();

    expect(result).to.deep.equal({});
  });
});

describe('search.predicates.infix', function () {
  it('matches correctly', function () {
    const queryTerm = 'light';
    const text = 'enlighten';

    const predicate = infix(queryTerm);
    const expected = [
      {
        startIndex: 2,
        length: queryTerm.length,
      },
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
        length: queryTerm.length,
      },
      {
        startIndex: 9,
        length: queryTerm.length,
      },
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

describe('search.predicates.prefix', function () {
  it('matches correctly', function () {
    const queryTerm = 'lay';
    const text = 'layout';

    const predicate = prefix(queryTerm);
    const expected = [{
      startIndex: 0,
      length: queryTerm.length,
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
