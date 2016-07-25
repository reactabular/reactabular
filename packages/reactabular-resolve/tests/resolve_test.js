import { expect } from 'chai';
import { resolve, nested, byFunction } from '../src';

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

  it('resolves using multiple resolvers', function () {
    const lastName = 'Demo';
    const columns = [
      {
        header: {
          label: 'Resolved value'
        },
        cell: {
          resolve: v => v + v,
          property: 'name.last'
        }
      }
    ];
    const rows = [
      {
        name: {
          last: lastName
        }
      }
    ];
    const expected = [
      {
        name: {
          last: lastName
        },
        'name.last': lastName,
        '_name.last': lastName + lastName
      }
    ];
    const resolver = resolve({
      columns,
      method: (row, column) => byFunction('cell.resolve')(
        nested(row, column),
        column
      )
    });

    expect(resolver(rows)).to.deep.equal(expected);
  });

  it('resolves using multiple resolvers and provides correct intermediate rowData', function () {
    const lastName = 'Demo';
    const columns = [
      {
        header: {
          label: 'Resolved value'
        },
        cell: {
          resolve: (value, { rowData }) => rowData.name.last + value,
          property: 'name.last'
        }
      }
    ];
    const rows = [
      {
        name: {
          last: lastName
        }
      }
    ];
    const expected = [
      {
        name: {
          last: 'Demo'
        },
        'name.last': lastName,
        '_name.last': lastName + lastName
      }
    ];
    const resolver = resolve({
      columns,
      method: (row, column) => byFunction('cell.resolve')(
        nested(row, column),
        column
      )
    });

    expect(resolver(rows)).to.deep.equal(expected);
  });
});
