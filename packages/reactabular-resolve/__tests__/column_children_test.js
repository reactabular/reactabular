import { expect } from 'chai';
import * as resolve from '../src';

const resolveColumnChildren = resolve.columnChildren;

describe('columnChildren', function () {
  it('does not resolve if a column does not have children', function () {
    const columns = [{
      foo: 'bar'
    }];

    expect(resolveColumnChildren({ columns })).to.deep.equal(columns);
  });

  it('resolves if a column has children', function () {
    const childrenColumns = [{
      foo: 'bar'
    }];
    const columns = [{
      children: childrenColumns
    }];

    expect(resolveColumnChildren({ columns })).to.deep.equal(childrenColumns);
  });

  it('allows children field to be customized', function () {
    const childrenField = 'demo';
    const childrenColumns = [{
      foo: 'bar'
    }];
    const columns = [{
      [childrenField]: childrenColumns
    }];

    expect(
      resolveColumnChildren({ columns, childrenField })
    ).to.deep.equal(childrenColumns);
  });

  it('throws an error if columns are not passed', function () {
    expect(resolveColumnChildren.bind(null, {})).to.throw(Error);
  });
});
