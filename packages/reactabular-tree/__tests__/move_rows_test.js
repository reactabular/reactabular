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

  it('swaps three rows with a parent relation I', function () {
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
        parent: 1,
        id: 2,
        name: 'zoo'
      }
    ];
    const sourceRowId = 0;
    const targetRowId = 2;
    const expectedRows = [
      {
        id: 1,
        name: 'bar'
      },
      {
        id: 2,
        name: 'zoo'
      },
      {
        parent: 2,
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

  it('swaps three rows with a parent relation II', function () {
    const rows = [
      {
        id: 0,
        name: 'foo'
      },
      {
        parent: 0,
        id: 1,
        name: 'bar'
      },
      {
        parent: 1,
        id: 2,
        name: 'zoo'
      }
    ];
    const sourceRowId = 0;
    const targetRowId = 2;
    const expectedRows = [
      {
        id: 1,
        name: 'bar'
      },
      {
        parent: 1,
        id: 2,
        name: 'zoo'
      },
      {
        parent: 2,
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

  it('swaps with a nested parent relation I', function () {
    const rows = [
      {
        id: 0,
        name: 'foo'
      },
      {
        parent: 0,
        id: 1,
        name: 'bar'
      },
      {
        parent: 1,
        id: 2,
        name: 'zoo'
      },
      {
        parent: 2,
        id: 3,
        name: 'meh'
      }
    ];
    const sourceRowId = 0;
    const targetRowId = 3;
    const expectedRows = [
      {
        id: 1,
        name: 'bar'
      },
      {
        parent: 1,
        id: 2,
        name: 'zoo'
      },
      {
        parent: 2,
        id: 3,
        name: 'meh'
      },
      {
        parent: 3,
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

  it('swaps with a nested parent relation II', function () {
    const rows = [
      {
        id: 0,
        name: 'foo'
      },
      {
        parent: 0,
        id: 1,
        name: 'bar'
      },
      {
        parent: 0,
        id: 2,
        name: 'zoo'
      },
      {
        parent: 2,
        id: 3,
        name: 'meh'
      }
    ];
    const sourceRowId = 0;
    const targetRowId = 3;
    const expectedRows = [
      {
        parent: undefined,
        id: 1,
        name: 'bar'
      },
      {
        parent: 1,
        id: 2,
        name: 'zoo'
      },
      {
        parent: 1,
        id: 3,
        name: 'meh'
      },
      {
        parent: 3,
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

  it('swaps with siblings', function () {
    const rows = [
      {
        id: 0,
        name: 'foo'
      },
      {
        parent: 0,
        id: 1,
        name: 'bar'
      },
      {
        parent: 1,
        id: 2,
        name: 'zoo'
      },
      {
        parent: 1,
        id: 3,
        name: 'meh'
      }
    ];
    const sourceRowId = 0;
    const targetRowId = 3;
    const expectedRows = [
      {
        parent: undefined,
        id: 1,
        name: 'bar'
      },
      {
        parent: 1,
        id: 2,
        name: 'zoo'
      },
      {
        parent: 2,
        id: 3,
        name: 'meh'
      },
      {
        parent: 2,
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

  it('swaps with siblings that have children', function () {
    const rows = [
      {
        id: 0,
        name: 'foo'
      },
      {
        parent: 0,
        id: 1,
        name: 'bar'
      },
      {
        parent: 1,
        id: 2,
        name: 'zoo'
      },
      {
        parent: 2,
        id: 3,
        name: 'mehmeh'
      },
      {
        parent: 1,
        id: 4,
        name: 'meh'
      }
    ];
    const sourceRowId = 0;
    const targetRowId = 4;
    const expectedRows = [
      {
        parent: undefined,
        id: 1,
        name: 'bar'
      },
      {
        parent: 1,
        id: 2,
        name: 'zoo'
      },
      {
        parent: 2,
        id: 3,
        name: 'mehmeh'
      },
      {
        parent: 3,
        id: 4,
        name: 'meh'
      },
      {
        parent: 2,
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
