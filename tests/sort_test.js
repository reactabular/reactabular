import orderBy from 'lodash/orderBy';
import reverse from 'lodash/reverse';
import { expect } from 'chai';
import { sort } from '../src';

const { byColumns, byColumn, sorter } = sort;

describe('byColumn', function () {
  it('sorts ascending by default', function () {
    const sortingColumns = null;
    const selectedColumn = 1;

    const expected = {
      [selectedColumn]: 'asc'
    };
    const result = byColumn({ sortingColumns, selectedColumn });

    expect(result).to.deep.equal(expected);
  });

  it('sorts ascending by default with an empty array', function () {
    const sortingColumns = [];
    const selectedColumn = 0;

    const expected = {
      [selectedColumn]: 'asc'
    };
    const result = byColumn({ sortingColumns, selectedColumn });

    expect(result).to.deep.equal(expected);
  });

  it('sorts descending if ascending the same first', function () {
    const selectedColumn = 0;
    const sortingColumns = {
      [selectedColumn]: 'asc'
    };

    const expected = {
      [selectedColumn]: 'desc'
    };
    const result = byColumn({ sortingColumns, selectedColumn });

    expect(result).to.deep.equal(expected);
  });


  it('removes sorting if descending the same first', function () {
    const selectedColumn = 0;
    const sortingColumns = {
      [selectedColumn]: 'desc'
    };

    const expected = {};
    const result = byColumn({ sortingColumns, selectedColumn });

    expect(result).to.deep.equal(expected);
  });

  it('sorts ascending if ascending another one first', function () {
    const selectedColumn = 0;
    const otherColumn = 1;
    const sortingColumns = {
      [otherColumn]: 'asc'
    };

    const expected = {
      [selectedColumn]: 'asc'
    };
    const result = byColumn({ sortingColumns, selectedColumn });

    expect(result).to.deep.equal(expected);
  });

  it('allows sorting order to be customized', function () {
    const sortingColumns = null;
    const sortingOrder = {
      FIRST: 'asc',
      asc: 'desc',
      desc: 'asc'
    };
    const selectedColumn = 0;

    const ascExpected = {
      [selectedColumn]: 'asc'
    };
    const descExpected = {
      [selectedColumn]: 'desc'
    };
    const firstResult = byColumn({ sortingColumns, sortingOrder, selectedColumn });
    const secondResult = byColumn({
      sortingColumns: firstResult,
      sortingOrder,
      selectedColumn
    });
    const thirdResult = byColumn({
      sortingColumns: secondResult,
      sortingOrder,
      selectedColumn
    });

    expect(firstResult).to.deep.equal(ascExpected);
    expect(secondResult).to.deep.equal(descExpected);
    expect(thirdResult).to.deep.equal(ascExpected);
  });
});

describe('byColumns', function () {
  it('sorts ascending by default', function () {
    const sortingColumns = null;
    const selectedColumn = 0;

    const expected = {
      [selectedColumn]: 'asc'
    };
    const result = byColumns({ sortingColumns, selectedColumn });

    expect(result).to.deep.equal(expected);
  });

  it('sorts ascending by default with an empty array', function () {
    const sortingColumns = [];
    const selectedColumn = 0;

    const expected = {
      [selectedColumn]: 'asc'
    };
    const result = byColumns({ sortingColumns, selectedColumn });

    expect(result).to.deep.equal(expected);
  });

  it('sorts descending if ascending the same first', function () {
    const selectedColumn = 0;
    const sortingColumns = {
      [selectedColumn]: 'asc'
    };

    const expected = {
      [selectedColumn]: 'desc'
    };
    const result = byColumns({ sortingColumns, selectedColumn });

    expect(result).to.deep.equal(expected);
  });

  it('removes sorting if descending the same first', function () {
    const selectedColumn = 0;
    const sortingColumns = {
      [selectedColumn]: 'desc'
    };

    const expected = {};
    const result = byColumns({ sortingColumns, selectedColumn });

    expect(result).to.deep.equal(expected);
  });

  it('sorts ascending if ascending another one first', function () {
    const selectedColumn = 1;
    const sortingColumns = {
      0: 'asc'
    };

    const expected = {
      ...sortingColumns,
      [selectedColumn]: 'asc'
    };
    const result = byColumns({ sortingColumns, selectedColumn });

    expect(result).to.deep.equal(expected);
  });

  it('allows sorting order to be customized', function () {
    const sortingColumns = null;
    const sortingOrder = {
      FIRST: 'asc',
      asc: 'desc',
      desc: 'asc'
    };
    const selectedColumn = 1;

    const ascExpected = {
      [selectedColumn]: 'asc'
    };
    const descExpected = {
      [selectedColumn]: 'desc'
    };

    const firstResult = byColumns({ sortingColumns, sortingOrder, selectedColumn });
    const secondResult = byColumns({
      sortingColumns: firstResult,
      sortingOrder,
      selectedColumn
    });
    const thirdResult = byColumns({
      sortingColumns: secondResult,
      sortingOrder,
      selectedColumn
    });

    expect(firstResult).to.deep.equal(ascExpected);
    expect(secondResult).to.deep.equal(descExpected);
    expect(thirdResult).to.deep.equal(ascExpected);
  });
});

describe('sorter', function () {
  it('sorts ascending', function () {
    const columns = [{
      header: {},
      cell: {
        property: 'test'
      }
    }];
    const data = [
      {
        test: 'abc'
      },
      {
        test: 'def'
      }
    ];
    const sortingColumns = {
      0: 'asc'
    };

    const result = sorter({ columns, sortingColumns, sort: orderBy })(data);

    expect(result).to.deep.equal(data);
  });

  it('sorts descending', function () {
    const columns = [{
      header: {},
      cell: {
        property: 'test'
      }
    }];
    const data = [
      {
        test: 'abc'
      },
      {
        test: 'def'
      }
    ];
    const sortingColumns = {
      0: 'desc'
    };

    const result = sorter({ columns, sortingColumns, sort: orderBy })(data);

    expect(result).to.deep.equal(reverse(data));
  });

  it('sorts ascending and descending', function () {
    const columns = [{
      header: {},
      cell: {
        property: 'name'
      }
    }, {
      header: {},
      cell: {
        property: 'position'
      }
    }];
    const data = [
      {
        name: 'joe',
        position: 'boss'
      },
      {
        name: 'adam',
        position: 'boss'
      },
      {
        name: 'mike',
        position: 'employee'
      }
    ];
    const expected = [
      {
        name: 'adam',
        position: 'boss'
      },
      {
        name: 'joe',
        position: 'boss'
      },
      {
        name: 'mike',
        position: 'employee'
      }
    ];
    const sortingColumns = {
      0: 'asc',
      1: 'asc'
    };

    const result = sorter({ columns, sortingColumns, sort: orderBy })(data);

    expect(result).to.deep.equal(expected);
  });

  it('returns data if there is no sorting information', function () {
    const columns = [{
      header: {},
      cell: {
        property: 'test'
      }
    }];
    const data = [
      {
        test: 'abc'
      },
      {
        test: 'def'
      }
    ];
    const result = sorter({ columns, sort: orderBy })(data);

    expect(result).to.deep.equal(data);
  });

  it('returns data if only data is passed', function () {
    const columns = [{
      header: {},
      cell: {
        property: 'test'
      }
    }];
    const data = [
      {
        test: 'abc'
      },
      {
        test: 'def'
      }
    ];
    const result = sorter({ columns })(data);

    expect(result).to.deep.equal(data);
  });

  it('sorts case-insensitively', function () {
    const columns = [{
      header: {},
      cell: {
        property: 'test'
      }
    }];
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
    const sortingColumns = {
      0: 'asc'
    };
    const result = sorter({ columns, sortingColumns, sort: orderBy })(data);

    expect(result).to.deep.equal(expected);
  });

  it('sorts numbers', function () {
    const columns = [{
      header: {},
      cell: {
        property: 'test'
      }
    }];
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
    const sortingColumns = {
      0: 'asc'
    };
    const result = sorter({ columns, sortingColumns, sort: orderBy })(data);

    expect(result).to.deep.equal(data);
  });

  it('sorts objects', function () {
    const columns = [{
      header: {},
      cell: {
        property: 'test.foo'
      }
    }];
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
    const sortingColumns = {
      0: 'asc'
    };
    const result = sorter({ columns, sortingColumns, sort: orderBy })(data);

    expect(result).to.deep.equal(data);
  });

  it('does not fail if property is missing', function () {
    const columns = [{
      header: {},
      cell: {
        property: 'test'
      }
    }];
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
    const sortingColumns = {
      0: 'asc'
    };
    const result = sorter({ columns, sortingColumns, sort: orderBy })(data);

    expect(result).to.deep.equal(data);
  });

  it('resolves fields', function () {
    const countries = {
      de: 'Germany',
      fi: 'Finland'
    };
    const data = [
      {
        id: 0,
        country: 'de'
      },
      {
        id: 1,
        country: 'fi'
      }
    ];
    const expected = [
      {
        id: 1,
        country: 'fi'
      },
      {
        id: 0,
        country: 'de'
      }
    ];
    const columns = [
      {
        cell: {
          property: 'country',
          resolve: country => countries[country]
        }
      }
    ];
    const sortingColumns = {
      0: 'asc'
    };
    const result = sorter({ columns, sortingColumns, sort: orderBy })(data);

    expect(result).to.deep.equal(expected);
  });

  it('throws an error if columns are not passed', function () {
    expect(sorter()).to.throw(Error);
  });
});
