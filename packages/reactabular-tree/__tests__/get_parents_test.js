import { expect } from 'chai';
import { getParents } from '../src';

describe('tree.getParents', function () {
  it('returns an empty array if empty rows are passed', function () {
    expect(getParents()([])).to.deep.equal([]);
  });

  it('returns an empty array if there are no parents', function () {
    const given = [
      {
        foo: 'bar'
      }
    ];
    const expected = [];

    expect(getParents({ index: 0 })(given)).to.deep.equal(expected);
  });

  it('returns an array with parent if there is one parent', function () {
    const given = [
      {
        foo: 'bar'
      },
      {
        parent: 'baz',
        foo: 'foo'
      }
    ];
    const expected = [
      {
        foo: 'bar'
      }
    ];

    expect(getParents({ index: 1 })(given)).to.deep.equal(expected);
  });

  it('returns an array with parent if there is one parent and parent has null parent', function () {
    const given = [
      {
        parent: null,
        foo: 'bar'
      },
      {
        parent: 'baz',
        foo: 'foo'
      }
    ];
    const expected = [
      {
        parent: null,
        foo: 'bar'
      }
    ];

    expect(getParents({ index: 1 })(given)).to.deep.equal(expected);
  });

  it('works with sibling children', function () {
    const given = [
      {
        foo: 'bar'
      },
      {
        parent: 'baz',
        foo: 'foo'
      },
      {
        parent: 'baz',
        foo: 'barbar'
      }
    ];
    const expected = [
      {
        foo: 'bar'
      }
    ];

    expect(getParents({ index: 2 })(given)).to.deep.equal(expected);
  });

  it('works with preceding parent', function () {
    const given = [
      {
        foo: 'bar'
      },
      {
        parent: 'baz',
        foo: 'foo'
      },
      {
        foo: 'barbar'
      }
    ];
    const expected = [];

    expect(getParents({ index: 2 })(given)).to.deep.equal(expected);
  });

  it('works with preceding parent if own parent is null', function () {
    const given = [
      {
        foo: 'bar'
      },
      {
        parent: 'baz',
        foo: 'foo'
      },
      {
        parent: null,
        foo: 'barbar'
      }
    ];
    const expected = [];

    expect(getParents({ index: 2 })(given)).to.deep.equal(expected);
  });

  it('works with sibling children without parents', function () {
    const given = [
      {
        foo: 'bar'
      },
      {
        foo: 'foo'
      }
    ];
    const expected = [];

    expect(getParents({ index: 1 })(given)).to.deep.equal(expected);
  });

  it('works with sibling children when parent is set to null', function () {
    const given = [
      {
        foo: 'bar',
        parent: null
      },
      {
        foo: 'foo',
        parent: null
      }
    ];
    const expected = [];

    expect(getParents({ index: 1 })(given)).to.deep.equal(expected);
  });

  it('works with nested children', function () {
    const given = [
      {
        foo: 'bar'
      },
      {
        parent: 'baz',
        foo: 'foo'
      },
      {
        parent: 'foo',
        foo: 'barbar'
      }
    ];
    const expected = [
      {
        foo: 'bar'
      },
      {
        parent: 'baz',
        foo: 'foo'
      }
    ];

    expect(getParents({ index: 2 })(given)).to.deep.equal(expected);
  });

  it('allows parent field to be customized', function () {
    const parentField = 'demo';
    const given = [
      {
        foo: 'bar'
      },
      {
        [parentField]: 'baz',
        foo: 'foo'
      },
      {
        [parentField]: 'foo',
        foo: 'barbar'
      }
    ];
    const expected = [
      {
        foo: 'bar'
      },
      {
        [parentField]: 'baz',
        foo: 'foo'
      }
    ];

    expect(getParents({ index: 2, parentField })(given)).to.deep.equal(expected);
  });
});
