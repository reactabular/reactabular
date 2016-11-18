import { expect } from 'chai';
import { index } from '../src';

describe('resolve.index', function () {
  it('resolves row index', function () {
    const lastName = 'demo';
    const rowData = {
      name: {
        last: lastName
      }
    };
    const rowIndex = 0;
    const expected = {
      _index: rowIndex,
      name: {
        last: lastName
      }
    };
    const column = {
      property: 'name'
    };

    expect(index({ rowIndex, column })(rowData)).to.deep.equal(expected);
  });
});
