import orderBy from 'lodash/orderBy';
import reverse from 'lodash/reverse';
import { expect } from 'chai';
import { sort } from '../src';

const { byColumns, byColumn, sorter } = sort;

describe('byColumn', function () {
  it('sorts ascending by default', function () {
    const sortingColumns = null;
    const selectedColumn = 'test';

    const expected = [
      {
        property: selectedColumn,
        sort: 'asc'
      }
    ];
    const result = byColumn({ sortingColumns, selectedColumn });

    expect(result).to.deep.equal(expected);
  });

  it('sorts ascending by default with an empty array', function () {
    const sortingColumns = [];
    const selectedColumn = 'test';

    const expected = [
      {
        property: selectedColumn,
        sort: 'asc'
      }
    ];
    const result = byColumn({ sortingColumns, selectedColumn });

    expect(result).to.deep.equal(expected);
  });

  it('sorts descending if ascending the same first', function () {
    const selectedColumn = 'test';
    const sortingColumns = [{
      property: selectedColumn,
      sort: 'asc'
    }];

    const expected = [
      {
        property: selectedColumn,
        sort: 'desc'
      }
    ];
    const result = byColumn({ sortingColumns, selectedColumn });

    expect(result).to.deep.equal(expected);
  });


  it('removes sorting if descending the same first', function () {
    const selectedColumn = 'test';
    const sortingColumns = [{
      property: selectedColumn,
      sort: 'desc'
    }];

    const expected = [];
    const result = byColumn({ sortingColumns, selectedColumn });

    expect(result).to.deep.equal(expected);
  });

  it('sorts ascending if ascending another one first', function () {
    const selectedColumn = 'test';
    const sortingColumns = [{
      property: 'another',
      sort: 'asc'
    }];

    const expected = [
      {
        property: selectedColumn,
        sort: 'asc'
      }
    ];
    const result = byColumn({ sortingColumns, selectedColumn });

    expect(result).to.deep.equal(expected);
  });
});

describe('byColumns', function () {
  it('sorts ascending by default', function () {
    const sortingColumns = null;
    const selectedColumn = 'test';

    const expected = [
      {
        property: selectedColumn,
        sort: 'asc'
      }
    ];
    const result = byColumns({ sortingColumns, selectedColumn });

    expect(result).to.deep.equal(expected);
  });

  it('sorts ascending by default with an empty array', function () {
    const sortingColumns = [];
    const selectedColumn = 'test';

    const expected = [
      {
        property: selectedColumn,
        sort: 'asc'
      }
    ];
    const result = byColumns({ sortingColumns, selectedColumn });

    expect(result).to.deep.equal(expected);
  });

  it('sorts descending if ascending the same first', function () {
    const selectedColumn = 'test';
    const sortingColumns = [{
      property: selectedColumn,
      sort: 'asc'
    }];

    const expected = [
      {
        property: selectedColumn,
        sort: 'desc'
      }
    ];
    const result = byColumns({ sortingColumns, selectedColumn });

    expect(result).to.deep.equal(expected);
  });

  it('removes sorting if descending the same first', function () {
    const selectedColumn = 'test';
    const sortingColumns = [{
      property: selectedColumn,
      sort: 'desc'
    }];

    const expected = [];
    const result = byColumns({ sortingColumns, selectedColumn });

    expect(result).to.deep.equal(expected);
  });

  it('sorts ascending if ascending another one first', function () {
    const selectedColumn = 'test';
    const sortingColumns = [{
      property: 'another',
      sort: 'asc'
    }];

    const expected = sortingColumns.concat([
      {
        property: selectedColumn,
        sort: 'asc'
      }
    ]);
    const result = byColumns({ sortingColumns, selectedColumn });

    expect(result).to.deep.equal(expected);
  });
});

describe('sorter', function () {
  it('sorts ascending', function () {
    const data = [
      {
        test: 'abc'
      },
      {
        test: 'def'
      }
    ];
    const sortingColumns = [{
      property: 'test',
      sort: 'asc'
    }];

    const result = sorter({ data, sortingColumns, sort: orderBy });

    expect(result).to.deep.equal(data);
  });

  it('sorts descending', function () {
    const data = [
      {
        test: 'abc'
      },
      {
        test: 'def'
      }
    ];
    const sortingColumns = [{
      property: 'test',
      sort: 'desc'
    }];

    const result = sorter({ data, sortingColumns, sort: orderBy });

    expect(result).to.deep.equal(reverse(data));
  });

  it('returns data if there is no sorting information', function () {
    const data = [
      {
        test: 'abc'
      },
      {
        test: 'def'
      }
    ];
    const result = sorter({ data, sort: orderBy });

    expect(result).to.deep.equal(data);
  });

  it('returns data if only data is passed', function () {
    const data = [
      {
        test: 'abc'
      },
      {
        test: 'def'
      }
    ];
    const result = sorter({ data });

    expect(result).to.deep.equal(data);
  });

  it('sorts case-insensitively', function () {
    const data = [
      {
        test: 'crep'
      },
      {
        test: 'Bllop'
      },
      {
        test: 'Dart'
      }
    ];
    const expected = [
      {
        test: 'Bllop'
      },
      {
        test: 'crep'
      },
      {
        test: 'Dart'
      }
    ];
    const sortingColumns = [{
      property: 'test',
      sort: 'asc'
    }];
    const result = sorter({ data, sortingColumns, sort: orderBy });

    expect(result).to.deep.equal(expected);
  });

  it('sorts numbers', function () {
    const data = [
      {
        test: 1
      },
      {
        test: 2
      },
      {
        test: 3
      }
    ];
    const sortingColumns = [{
      property: 'test',
      sort: 'asc'
    }];
    const result = sorter({ data, sortingColumns, sort: orderBy });

    expect(result).to.deep.equal(data);
  });

  it('sorts objects', function () {
    const data = [
      {
        test: {
          foo: 'bar'
        }
      },
      {
        test: {
          foo: 'foo'
        }
      },
      {
        test: {
          foo: 'zoo'
        }
      }
    ];
    const sortingColumns = [{
      property: 'test.foo',
      sort: 'asc'
    }];
    const result = sorter({ data, sortingColumns, sort: orderBy });

    expect(result).to.deep.equal(data);
  });

  it('does not fail if property is missing', function () {
    const data = [
      {
        test: 1
      },
      {
        test: 2
      },
      {
        test: 3
      }
    ];
    const sortingColumns = [{
      sort: 'asc'
    }];
    const result = sorter({ data, sortingColumns, sort: orderBy });

    expect(result).to.deep.equal(data);
  });
});
