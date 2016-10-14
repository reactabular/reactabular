import { expect } from 'chai';
import { getChildren } from '../src';

describe('tree.getChildren', function () {
  it('returns an empty array if empty rows are passed', function () {
    expect(getChildren()([])).to.deep.equal([]);
  });

  it('returns an empty array if there are no children', function () {
    const given = [
      {
        foo: 'bar'
      }
    ];
    const expected = [];

    expect(getChildren({ index: 0 })(given)).to.deep.equal(expected);
  });

  it('returns an array with the child if there is one child', function () {
    const given = [
      {
        id: 0,
        foo: 'bar'
      },
      {
        parent: 0,
        foo: 'foo'
      }
    ];
    const expected = [
      {
        parent: 0,
        foo: 'foo'
      }
    ];

    expect(getChildren({ index: 0 })(given)).to.deep.equal(expected);
  });

  it('works with sibling children', function () {
    const given = [
      {
        id: 0,
        foo: 'bar'
      },
      {
        id: 1,
        parent: 0,
        foo: 'foo'
      },
      {
        id: 2,
        parent: 0,
        foo: 'barbar'
      }
    ];
    const expected = [
      {
        id: 1,
        parent: 0,
        foo: 'foo'
      },
      {
        id: 2,
        parent: 0,
        foo: 'barbar'
      }
    ];

    expect(getChildren({ index: 0 })(given)).to.deep.equal(expected);
  });

  it('works with complex children', function () {
    const given = [
      {
        id: 0,
        foo: 'bar'
      },
      {
        id: 1,
        parent: 0,
        foo: 'foo'
      },
      {
        id: 2,
        parent: 1,
        foo: 'barbarbar'
      },
      {
        id: 3,
        parent: 0,
        foo: 'barbar'
      }
    ];
    const expected = [
      {
        id: 1,
        parent: 0,
        foo: 'foo'
      },
      {
        id: 2,
        parent: 1,
        foo: 'barbarbar'
      },
      {
        id: 3,
        parent: 0,
        foo: 'barbar'
      }
    ];

    expect(getChildren({ index: 0 })(given)).to.deep.equal(expected);
  });

  it('works with multiple children', function () {
    const given = [
      {
        id: 0,
        foo: 'bar'
      },
      {
        id: 1,
        parent: 0,
        foo: 'foo'
      },
      {
        id: 2,
        parent: 1,
        foo: 'barbar'
      }
    ];
    const expected = [
      {
        id: 1,
        parent: 0,
        foo: 'foo'
      },
      {
        id: 2,
        parent: 1,
        foo: 'barbar'
      }
    ];

    expect(getChildren({ index: 0 })(given)).to.deep.equal(expected);
  });

  it('works with nested children', function () {
    const given = [
      {
        id: 0,
        foo: 'bar'
      },
      {
        id: 1,
        parent: 0,
        foo: 'foo'
      },
      {
        id: 2,
        parent: 1,
        foo: 'barbar'
      }
    ];
    const expected = [
      {
        id: 2,
        parent: 1,
        foo: 'barbar'
      }
    ];

    expect(getChildren({ index: 1 })(given)).to.deep.equal(expected);
  });

  it('allows parent field to be customized', function () {
    const parentField = 'demo';
    const given = [
      {
        id: 0,
        foo: 'bar'
      },
      {
        id: 1,
        [parentField]: 0,
        foo: 'foo'
      },
      {
        id: 2,
        [parentField]: 1,
        foo: 'barbar'
      }
    ];
    const expected = [
      {
        id: 2,
        [parentField]: 1,
        foo: 'barbar'
      }
    ];

    expect(getChildren({ index: 1, parentField })(given)).to.deep.equal(expected);
  });

  it('allows id field to be customized', function () {
    const idField = 'demo';
    const given = [
      {
        [idField]: 0,
        foo: 'bar'
      },
      {
        [idField]: 1,
        parent: 0,
        foo: 'foo'
      },
      {
        [idField]: 2,
        parent: 1,
        foo: 'barbar'
      }
    ];
    const expected = [
      {
        [idField]: 2,
        parent: 1,
        foo: 'barbar'
      }
    ];

    expect(getChildren({ index: 1, idField })(given)).to.deep.equal(expected);
  });
});
