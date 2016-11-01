import { reverse } from 'lodash';
import { moveRows } from '../src';

describe('tree.moveRows', function () {
  it('returns same tree rows if there is nothing to move', function () {
    const rows = [
      {
        id: 0,
        name: 'foo'
      },
      {
        id: 1,
        name: 'bar'
      }
    ];
    const sourceRowId = 0;
    const targetRowId = 0;

    expect(moveRows({
      rows,
      sourceRowId,
      targetRowId
    })).toEqual({
      rows,
      sourceIndex: sourceRowId,
      targetIndex: targetRowId
    });
  });

  it('swaps two rows', function () {
    const rows = [
      {
        id: 0,
        name: 'foo'
      },
      {
        id: 1,
        name: 'bar'
      }
    ];
    const sourceRowId = 0;
    const targetRowId = 1;

    expect(moveRows({
      rows,
      sourceRowId,
      targetRowId
    })).toEqual({
      rows: reverse(rows),
      sourceIndex: sourceRowId,
      targetIndex: targetRowId
    });
  });

  it('swaps three rows', function () {
    const rows = [
      {
        id: 0,
        name: 'foo'
      },
      {
        id: 1,
        name: 'bar'
      },
      {
        id: 2,
        name: 'zoo'
      }
    ];
    const sourceRowId = 0;
    const targetRowId = 2;

    expect(moveRows({
      rows,
      sourceRowId,
      targetRowId
    })).toEqual({
      rows: [rows[1], rows[2], rows[0]],
      sourceIndex: sourceRowId,
      targetIndex: targetRowId
    });
  });

  it('swaps two rows with a parent relation', function () {
    const rows = [
      {
        id: 0,
        name: 'foo'
      },
      {
        parent: 0,
        id: 1,
        name: 'bar'
      }
    ];
    const sourceRowId = 0;
    const targetRowId = 1;
    const expectedRows = [
      {
        parent: undefined,
        id: 1,
        name: 'bar'
      },
      {
        parent: 1,
        id: 0,
        name: 'foo'
      }
    ];

    expect(moveRows({
      rows,
      sourceRowId,
      targetRowId
    })).toEqual({
      rows: expectedRows,
      sourceIndex: sourceRowId,
      targetIndex: targetRowId
    });
  });
});
