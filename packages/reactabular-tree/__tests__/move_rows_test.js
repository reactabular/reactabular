import { expect } from 'chai';
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
    })).to.deep.equal({
      rows,
      sourceIndex: sourceRowId,
      targetIndex: targetRowId
    });
  });
});
