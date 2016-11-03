import { resolveRowKey } from '../src';

describe('table.resolveRowKey', function () {
  it('resolves to rowKey', function () {
    const rowKey = 'id';
    const rowData = {
      [rowKey]: 5,
      foo: 'bar'
    };
    const rowIndex = 0;

    expect(resolveRowKey({ rowData, rowIndex, rowKey })).toEqual('5-row');
  });

  it('resolves to rowIndex if rowKey is not found', function () {
    const rowKey = 'zoo';
    const rowData = {
      id: 5,
      foo: 'bar'
    };
    const rowIndex = 0;

    expect(resolveRowKey({ rowData, rowIndex, rowKey })).toEqual('0-row');
  });

  it('resolves zero index to zero', function () {
    const rowKey = 'id';
    const rowData = {
      [rowKey]: 0,
      foo: 'bar'
    };
    const rowIndex = 0;

    expect(resolveRowKey({ rowData, rowIndex, rowKey })).toEqual('0-row');
  });

  it('allows rowKey to be a function', function () {
    const rowKey = ({ rowIndex }) => rowIndex;
    const rowData = {
      [rowKey]: 5,
      foo: 'bar'
    };
    const rowIndex = 0;

    expect(resolveRowKey({ rowData, rowIndex, rowKey })).toEqual(`${rowIndex}-row`);
  });

  it('allows rowKey to be a getter', function () {
    class Row {
      constructor() {
        this.val = 'bar';
      }
      get foo() {
        return this.val;
      }
    }

    const rowIndex = 0;
    const rowKey = 'foo';
    const rowData = new Row();

    expect(resolveRowKey({ rowData, rowIndex, rowKey })).toEqual('bar-row');
  });
});
