import { expect } from 'chai';
import { resolveBodyColumns } from '../src';

describe('resolveBodyColumns', function () {
  it('does not resolve if a column does not have children', function () {
    const columns = [{
      foo: 'bar'
    }];

    expect(resolveBodyColumns(columns)).to.deep.equal(columns);
  });

  it('resolves if a column has children', function () {
    const childColumns = [{
      foo: 'bar'
    }];
    const columns = [{
      children: childColumns
    }];

    expect(resolveBodyColumns(columns)).to.deep.equal(childColumns);
  });
});
