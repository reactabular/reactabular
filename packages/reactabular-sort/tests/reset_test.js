import { expect } from 'chai';
import { reset, strategies } from '../src';

describe('sort.reset', function () {
  it('resets by columnIndex by default', function () {
    let result;
    const columns = {
      0: {
        position: 0
      },
      2: {
        position: 1
      }
    };
    const resetable = reset({
      getSortingColumns: () => columns,
      onReset: ({ sortingColumns }) => {
        result = sortingColumns;
      }
    });

    const expected = {
      2: {
        position: 0
      }
    };
    resetable(null, {
      columnIndex: 0
    }).onDoubleClick();

    expect(result).to.deep.equal(expected);
  });

  it('resets by property strategy', function () {
    let result;

    const key = 'foo';
    const columns = {
      [key]: {
        position: 0
      },
      bar: {
        position: 1
      }
    };
    const resetable = reset({
      getSortingColumns: () => columns,
      onReset: ({ sortingColumns }) => {
        result = sortingColumns;
      },
      strategy: strategies.byProperty
    });

    const expected = {
      bar: {
        position: 0
      }
    };
    resetable(null, {
      property: key
    }).onDoubleClick();

    expect(result).to.deep.equal(expected);
  });
});
