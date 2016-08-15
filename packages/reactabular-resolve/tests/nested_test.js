import { expect } from 'chai';
import { nested } from '../src';

describe('resolve.nested', function () {
  it('resolves nested values', function () {
    const lastName = 'demo';
    const property = 'name.last';
    const rowData = {
      name: {
        last: lastName
      }
    };
    const expected = {
      name: {
        last: lastName
      },
      [property]: lastName
    };
    const column = { property };

    expect(nested({ rowData, column })).to.deep.equal(expected);
  });

  it('resolves normal values', function () {
    const name = 'demo';
    const property = 'name';
    const rowData = {
      name
    };
    const column = { property };

    expect(nested({ rowData, column })).to.deep.equal({ [property]: name });
  });

  it('does nothing if there is no property', function () {
    const name = 'demo';
    const rowData = {
      name
    };
    const column = { property: undefined };

    expect(nested({ rowData, column })).to.deep.equal({});
  });

  it('does not crash without a property', function () {
    const name = 'demo';
    const rowData = {
      name
    };
    const column = { cell: {} };

    expect(nested({ rowData, column })).to.deep.equal({});
  });

  it('does not crash without a cell', function () {
    const name = 'demo';
    const rowData = {
      name
    };
    const column = {};

    expect(nested({ rowData, column })).to.deep.equal({});
  });
});
