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

    expect(result).toEqual(expected);
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

    expect(result).toEqual(expected);
  });

  it('allows changing event', function () {
    let result;

    const event = 'onClick';
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
      event,
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
    })[event]();

    expect(result).toEqual(expected);
  });

  it('resets only columns before the reseted one', function () {
    let result;
    const columns = {
      0: {
        position: 0
      },
      2: {
        position: 1
      },
      3: {
        position: 2
      }
    };
    const resetable = reset({
      getSortingColumns: () => columns,
      onReset: ({ sortingColumns }) => {
        result = sortingColumns;
      }
    });

    const expected = {
      0: {
        position: 0
      },
      3: {
        position: 1
      }
    };
    resetable(null, {
      columnIndex: 2
    }).onDoubleClick();

    expect(result).toEqual(expected);
  });

  it('returns an empty array without sorting columns', function () {
    let result;
    const resetable = reset({
      getSortingColumns: () => [],
      onReset: ({ sortingColumns }) => {
        result = sortingColumns;
      }
    });
    const expected = undefined;

    resetable(null, {
      columnIndex: 0
    }).onDoubleClick();

    expect(result).toEqual(expected);
  });
});
