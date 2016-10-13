import { expect } from 'chai';
import { multipleColumns } from '../src';

describe('search.multipleColumns', function () {
  it('matches all', function () {
    const query = { demo: 'foo' };
    const rows = [{ demo: 'foobar' }, { demo: 'foofoo' }];
    const result = multipleColumns({
      query,
      columns: [
        {
          property: 'demo'
        }
      ]
    })(rows);

    expect(result).to.deep.equal(rows);
  });

  it('matches all II', function () {
    const given = [
      {
        foo: 'bar'
      }
    ];
    const columns = [
      {
        property: 'foo'
      }
    ];
    const query = {
      foo: 'bar'
    };

    expect(multipleColumns({ columns, query })(given)).to.deep.equal(given);
  });

  it('matches some', function () {
    const query = { demo: 'foo' };
    const match = { demo: 'foobar' };
    const rows = [match, { demo: 'zappa' }];
    const result = multipleColumns({
      query,
      columns: [
        {
          property: 'demo'
        }
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
        {
          property: 'demo'
        },
        {
          property: 'another'
        }
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
        {
          property: 'demo'
        }
      ]
    })(rows);

    expect(result).to.deep.equal([]);
  });

  it('returns all rows without a query', function () {
    const rows = [{ demo: 'foobar' }, { demo: 'zappa' }];
    const result = multipleColumns({
      columns: [
        {
          property: 'demo'
        }
      ]
    })(rows);

    expect(result).to.deep.equal(rows);
  });

  it('accepts alternative casting strategy', function () {
    const query = { demo: 'foobar' };
    const rows = [{ demo: 'foo' }, { demo: 'barfoo' }];
    const result = multipleColumns({
      query,
      columns: [
        {
          property: 'demo'
        }
      ],
      castingStrategy: v => `${v}bar`
    })(rows);

    expect(result).to.deep.equal(rows);
  });
});
