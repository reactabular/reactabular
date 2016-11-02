import { expect } from 'chai';
import { filter } from '../src';

describe('tree.filter', function () {
  it('returns empty rows if empty rows are passed', function () {
    expect(filter()([])).to.deep.equal([]);
  });

  it('returns rows that do not have parents', function () {
    const given = [
      {
        foo: 'bar'
      },
      {
        foo: 'foo',
        showingChildren: true
      }
    ];

    expect(filter({ fieldName: 'showingChildren' })(given)).to.deep.equal(given);
  });

  it('returns rows with showingChildren set true while checking parents', function () {
    const given = [
      {
        foo: 'bar'
      },
      {
        id: 123,
        foo: 'foo',
        showingChildren: false
      },
      {
        id: 234,
        parent: 123,
        foo: 'foo'
      }
    ];
    const expected = [
      {
        foo: 'bar'
      },
      {
        id: 123,
        foo: 'foo',
        showingChildren: false
      }
    ];

    expect(filter({ fieldName: 'showingChildren' })(given)).to.deep.equal(expected);
  });

  it('works if parent id is zero', function () {
    const given = [
      {
        foo: 'bar'
      },
      {
        id: 0,
        foo: 'foo',
        showingChildren: false
      },
      {
        id: 234,
        parent: 0,
        foo: 'foo'
      }
    ];
    const expected = [
      {
        foo: 'bar'
      },
      {
        id: 0,
        foo: 'foo',
        showingChildren: false
      }
    ];

    expect(filter({ fieldName: 'showingChildren' })(given)).to.deep.equal(expected);
  });

  it('allow parent field to be customized', function () {
    const parentField = 'demo';
    const given = [
      {
        foo: 'bar'
      },
      {
        id: 123,
        foo: 'foo',
        showingChildren: false
      },
      {
        id: 234,
        [parentField]: 123,
        foo: 'foo'
      }
    ];
    const expected = [
      {
        foo: 'bar'
      },
      {
        id: 123,
        foo: 'foo',
        showingChildren: false
      }
    ];

    expect(filter({
      fieldName: 'showingChildren',
      parentField
    })(given)).to.deep.equal(expected);
  });
});
