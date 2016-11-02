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
      sourceRowId,
      targetRowId
    })(rows)).to.deep.equal(rows);
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
      sourceRowId,
      targetRowId
    })(rows)).to.deep.equal(reverse(rows));
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
      sourceRowId,
      targetRowId
    })(rows)).to.deep.equal([rows[1], rows[2], rows[0]]);
  });
});
