import { resolveRowKey } from '../src';

/* eslint-disable no-console */

const originalWarn = console.warn;
afterEach(function () {
  console.warn = originalWarn;
});

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

  it('does not show warning when rowKey=0', function () {
    console.warn = jest.fn();
    const rowKey = 'id';
    const rowData = {
      [rowKey]: 0,
      foo: 'bar'
    };
    const rowIndex = 0;

    resolveRowKey({ rowData, rowIndex, rowKey });

    expect(console.warn).toHaveBeenCalledTimes(0);
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
