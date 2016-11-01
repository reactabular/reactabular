import { expect } from 'chai';
import { reverse } from 'lodash';
import { moveRows } from '../src';

describe('dnd.moveRows', function () {
  it('returns same rows if there is nothing to move', function () {
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
    })).to.deep.equal({
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
    })).to.deep.equal({
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
    })).to.deep.equal({
      rows: [rows[1], rows[2], rows[0]],
      sourceIndex: sourceRowId,
      targetIndex: targetRowId
    });
  });
});
