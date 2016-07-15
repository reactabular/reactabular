import { expect } from 'chai';
import { resolve as _resolve } from '../src';

const { resolve, nested, byFunction } = _resolve;

describe('resolve.resolve', function () {
  it('throws an error if columns are not passed', function () {
    expect(resolve).to.throw(Error);
  });

  it('throws an error if method is not passed', function () {
    expect(resolve.bind(null, { columns: [] })).to.throw(Error);
  });

  it('executes resolver over rows', function () {
    const name = 'Demo';
    const columns = [
      {
        header: {
          label: 'Last name'
        },
        cell: {
          property: 'name'
        }
      }
    ];
    const rows = [
      {
        name
      }
    ];
    const expected = [
      {
        name,
        _name: rows[0].name
      }
    ];
    const method = (row, { cell: { property } }) => ({
      [property]: row.name,
      [`_${property}`]: row.name
    });

    expect(resolve({
      columns,
      method
    })(rows)).to.deep.equal(expected);
  });

  it('executes resolver over nested rows', function () {
    const name = 'Demo';
    const columns = [
      {
        header: {
          label: 'Last name'
        },
        children: [
          {
            header: {
              label: 'First Name'
            },
            cell: {
              property: 'name'
            }
          }
        ]
      }
    ];
    const rows = [
      {
        name
      }
    ];
    const method = (row, { cell: { property } }) => ({
      [property]: row.name
    });

    expect(resolve({
      columns,
      method
    })(rows)).to.deep.equal(rows);
  });
});

describe('resolve.nested', function () {
  it('resolves nested values', function () {
    const lastName = 'demo';
    const property = 'name.last';
    const row = {
      name: {
        last: lastName
      }
    };
    const column = { cell: { property } };

    expect(nested(row, column)).to.deep.equal({ [property]: lastName });
  });

  it('resolves normal values', function () {
    const name = 'demo';
    const property = 'name';
    const row = {
      name
    };
    const column = { cell: { property } };

    expect(nested(row, column)).to.deep.equal({ [property]: name });
  });

  it('does not crash without a property', function () {
    const name = 'demo';
    const row = {
      name
    };
    const column = { cell: {} };

    expect(nested(row, column)).to.deep.equal({});
  });

  it('does not crash without a cell', function () {
    const name = 'demo';
    const row = {
      name
    };
    const column = {};

    expect(nested(row, column)).to.deep.equal({});
  });
});

describe('resolve.byFunction', function () {
  it('does not resolve without a resolver', function () {
    const name = 'demo';
    const property = 'name';
    const row = {
      name
    };
    const column = {
      cell: {
        property
      }
    };

    expect(
      byFunction('column.cell.resolve')(row, column)
    ).to.deep.equal({
      [property]: name
    });
  });

  it('resolves with a resolver', function () {
    const countries = { dk: 'Denmark' };
    const country = 'dk';
    const property = 'country';
    const row = {
      country
    };
    const column = {
      cell: {
        property,
        resolve: v => countries[v]
      }
    };

    expect(
      byFunction('cell.resolve')(row, column)
    ).to.deep.equal({
      [property]: country,
      [`_${property}`]: countries.dk
    });
  });
});
