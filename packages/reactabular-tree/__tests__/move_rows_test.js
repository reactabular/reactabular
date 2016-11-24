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
      sourceRowId,
      targetRowId
    })(rows)).toEqual(rows);
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
    })(rows)).toEqual(reverse(rows));
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
    })(rows)).toEqual([rows[1], rows[2], rows[0]]);
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
      sourceRowId,
      targetRowId
    })(rows)).toEqual(expectedRows);
  });

  it('warns with an invalid parent', function () {
    const rows = [
      {
        id: 0,
        name: 'foo'
      },
      {
        parent: 100,
        id: 1,
        name: 'bar'
      }
    ];
    const sourceRowId = 0;
    const targetRowId = 1;

    expect(moveRows({
      sourceRowId,
      targetRowId
    })(rows)).toEqual(rows);

    expect(console.warn).toBeCalled(); // eslint-disable-line no-console
  });

  it('swaps rows with a parent', function () {
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
        id: 2,
        name: 'zoo'
      }
    ];
    const sourceRowId = 2;
    const targetRowId = 0;
    const expectedRows = [
      {
        parent: undefined,
        id: 2,
        name: 'zoo'
      },
      {
        parent: 2,
        id: 0,
        name: 'foo'
      },
      {
        parent: undefined,
        id: 1,
        name: 'bar'
      }
    ];

    expect(moveRows({
      sourceRowId,
      targetRowId
    })(rows)).toEqual(expectedRows);
  });

  it('swaps rows with a null parent', function () {
    const rows = [
      {
        parent: null,
        id: 0,
        name: 'foo'
      },
      {
        parent: 0,
        id: 1,
        name: 'bar'
      },
      {
        parent: null,
        id: 2,
        name: 'zoo'
      }
    ];
    const sourceRowId = 2;
    const targetRowId = 0;
    const expectedRows = [
      {
        parent: undefined,
        id: 2,
        name: 'zoo'
      },
      {
        parent: 2,
        id: 0,
        name: 'foo'
      },
      {
        parent: undefined,
        id: 1,
        name: 'bar'
      }
    ];

    expect(moveRows({
      sourceRowId,
      targetRowId
    })(rows)).toEqual(expectedRows);
  });

  it('retains custom fields', function () {
    const retainedField = 'showChildren';
    const rows = [
      {
        id: 0,
        name: 'foo',
        [retainedField]: true
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
        name: 'bar',
        [retainedField]: true
      },
      {
        parent: 1,
        id: 0,
        name: 'foo'
      }
    ];

    expect(moveRows({
      sourceRowId,
      targetRowId,
      retain: [retainedField]
    })(rows)).toEqual(expectedRows);
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
      sourceRowId,
      targetRowId
    })(rows)).toEqual(expectedRows);
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
      sourceRowId,
      targetRowId
    })(rows)).toEqual(expectedRows);
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
      sourceRowId,
      targetRowId
    })(rows)).toEqual(expectedRows);
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
      sourceRowId,
      targetRowId
    })(rows)).toEqual(expectedRows);
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
      sourceRowId,
      targetRowId
    })(rows)).toEqual(expectedRows);
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
      sourceRowId,
      targetRowId
    })(rows)).toEqual(expectedRows);
  });
});
