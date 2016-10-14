import { expect } from 'chai';
import { search } from '../src';

describe('tree.search', function () {
  it('returns empty rows if empty rows are passed', function () {
    expect(search({ columns: [], query: {} })([])).to.deep.equal([]);
  });

  it('returns matching rows', function () {
    const given = [
      {
        foo: 'bar'
      }
    ];
    const columns = [
      {
        property: 'foo'
      }
    ];
    const query = {
      foo: 'bar'
    };

    expect(search({ columns, query })(given)).to.deep.equal(given);
  });

  it('matches children', function () {
    const given = [
      {
        _index: 0,
        id: 0,
        foo: 'bar'
      },
      {
        _index: 1,
        id: 1,
        parent: 0,
        foo: 'zoo'
      }
    ];
    const columns = [
      {
        property: 'foo'
      }
    ];
    const query = {
      foo: 'zoo'
    };

    expect(search({ columns, query })(given)).to.deep.equal(given);
  });

  it('matches multiple children', function () {
    const given = [
      {
        _index: 0,
        id: 0,
        foo: 'bar'
      },
      {
        _index: 1,
        id: 1,
        parent: 0,
        foo: 'zoo'
      },
      {
        _index: 2,
        id: 2,
        parent: 0,
        foo: 'zoo'
      }
    ];
    const columns = [
      {
        property: 'foo'
      }
    ];
    const query = {
      foo: 'zoo'
    };

    expect(search({ columns, query })(given)).to.deep.equal(given);
  });

  it('returns the same structure with an empty query', function () {
    const given = [
      {
        _index: 0,
        id: 0,
        foo: 'bar'
      },
      {
        _index: 1,
        id: 1,
        parent: 0,
        foo: 'zoo'
      },
      {
        _index: 2,
        id: 2,
        parent: 0,
        foo: 'zoo'
      }
    ];
    const columns = [
      {
        property: 'foo'
      }
    ];
    const query = {};

    expect(search({ columns, query })(given)).to.deep.equal(given);
  });

  it('returns the same structure with an empty all query', function () {
    const given = [
      {
        _index: 0,
        id: 0,
        foo: 'bar'
      },
      {
        _index: 1,
        id: 1,
        parent: 0,
        foo: 'zoo'
      },
      {
        _index: 2,
        id: 2,
        parent: 0,
        foo: 'zoo'
      }
    ];
    const columns = [
      {
        property: 'foo'
      }
    ];
    const query = {
      all: ''
    };

    expect(search({ columns, query })(given)).to.deep.equal(given);
  });

  it('retains children on match', function () {
    const given = [
      {
        _index: 0,
        id: 0,
        foo: 'bar'
      },
      {
        _index: 1,
        id: 1,
        parent: 0,
        foo: 'zoo'
      },
      {
        _index: 2,
        id: 2,
        parent: 1,
        foo: 'barbar'
      }
    ];
    const columns = [
      {
        property: 'foo'
      }
    ];
    const query = {
      all: 'zoo'
    };
    const expected = [
      {
        _index: 0,
        id: 0,
        foo: 'bar'
      },
      {
        _index: 1,
        id: 1,
        parent: 0,
        foo: 'zoo'
      },
      {
        _index: 2,
        id: 2,
        parent: 1,
        foo: 'barbar'
      }
    ];

    expect(search({ columns, query })(given)).to.deep.equal(expected);
  });
});
