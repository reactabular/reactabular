import { compose } from 'redux';
import { resolve, nested, byFunction } from '../src';

describe('resolve.resolve', function () {
  it('throws an error if columns are not passed', function () {
    expect(resolve).toThrow(Error);
  });

  it('throws an error if method is not passed', function () {
    expect(resolve.bind(null, { columns: [] })).toThrow(Error);
  });

  it('executes resolver over rows', function () {
    const name = 'Demo';
    const columns = [
      {
        property: 'name',
        header: {
          label: 'Last name'
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
    const method = ({ column }) => rowData => ({
      [column.property]: rowData.name,
      [`_${column.property}`]: rowData.name
    });

    expect(resolve({
      columns,
      method
    })(rows)).toEqual(expected);
  });

  it('executes nested over rows', function () {
    const name = 'Demo';
    const columns = [
      {
        property: 'name.first',
        header: {
          label: 'First name'
        }
      },
      {
        property: 'name.last',
        header: {
          label: 'Last name'
        }
      }
    ];
    const rows = [
      {
        name: {
          first: name,
          last: name
        }
      }
    ];
    const expected = [
      {
        name: {
          first: name,
          last: name
        },
        'name.first': name,
        'name.last': name
      }
    ];

    expect(
      resolve({ columns, method: nested })(rows)
    ).toEqual(expected);
  });

  it('resolves using multiple resolvers', function () {
    const lastName = 'Demo';
    const columns = [
      {
        property: 'name.last',
        header: {
          label: 'Resolved value'
        },
        cell: {
          resolve: v => v + v
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
      method: extra => compose(
        byFunction('cell.resolve')(extra),
        nested(extra)
      )
    });

    expect(resolver(rows)).toEqual(expected);
  });

  it('resolves using multiple resolvers and provides correct intermediate rowData', function () {
    const lastName = 'Demo';
    const columns = [
      {
        property: 'name.last',
        header: {
          label: 'Resolved value'
        },
        cell: {
          resolve: (value, { rowData }) => rowData.name.last + value
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
      method: extra => compose(
        byFunction('cell.resolve')(extra),
        nested(extra)
      )
    });

    expect(resolver(rows)).toEqual(expected);
  });

  it('passes rowIndex', function () {
    const originalId = 123;
    const columns = [
      {
        cell: {
          formatters: [a => a]
        }
      }
    ];
    const rows = [
      {
        id: originalId
      }
    ];
    const expected = [
      {
        id: originalId,
        _index: 0
      }
    ];
    const method = ({ rowIndex }) => rowData => ({
      ...rowData,
      _index: rowIndex
    });
    const resolver = resolve({
      columns,
      method
    });

    expect(resolver(rows)).toEqual(expected);
  });

  it('passes empty cells through', function () {
    const originalId = 123;
    const columns = [
      {
        cell: {
          formatters: [a => a]
        }
      }
    ];
    const rows = [
      {
        id: originalId
      }
    ];
    const expected = [
      {
        id: originalId
      }
    ];
    const resolver = resolve({
      columns,
      method: extra => compose(
        byFunction('cell.resolve')(extra),
        nested(extra)
      )
    });

    expect(resolver(rows)).toEqual(expected);
  });

  it('does not crash without rows', function () {
    const columns = [
      {
        cell: {
          formatters: [a => a]
        }
      }
    ];
    const resolver = resolve({
      columns,
      method: ({ rowData, column }) => byFunction('cell.resolve')({
        rowData: nested({ rowData, column }),
        column
      })
    });

    expect(resolver()).toEqual([]);
  });
});
