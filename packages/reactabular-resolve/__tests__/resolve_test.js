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
    const method = ({ rowData, column }) => ({
      [column.property]: rowData.name,
      [`_${column.property}`]: rowData.name
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
            property: 'name',
            header: {
              label: 'First Name'
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
    const method = ({ rowData, column }) => ({
      [column.property]: rowData.name
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
      method: ({ rowData, column }) => byFunction('cell.resolve')({
        rowData: nested({ rowData, column }),
        column
      })
    });

    expect(resolver(rows)).to.deep.equal(expected);
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
      method: ({ rowData, column }) => byFunction('cell.resolve')({
        rowData: nested({ rowData, column }),
        column
      })
    });

    expect(resolver(rows)).to.deep.equal(expected);
  });

  it('passes rowIndex', function () {
    const originalId = 123;
    const columns = [
      {
        cell: {
          format: a => a
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
    const method = ({ rowData, rowIndex }) => ({
      ...rowData,
      _index: rowIndex
    });
    const resolver = resolve({
      columns,
      method
    });

    expect(resolver(rows)).to.deep.equal(expected);
  });

  it('passes empty cells through', function () {
    const originalId = 123;
    const columns = [
      {
        cell: {
          format: a => a
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
      method: ({ rowData, column }) => byFunction('cell.resolve')({
        rowData: nested({ rowData, column }),
        column
      })
    });

    expect(resolver(rows)).to.deep.equal(expected);
  });

  it('does not crash without rows', function () {
    const columns = [
      {
        cell: {
          format: a => a
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

    expect(resolver()).to.deep.equal([]);
  });
});
