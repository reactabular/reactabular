import { expect } from 'chai';
import { collapseAll } from '../src';

describe('tree.collapseAll', function () {
  it('returns empty rows if empty rows are passed', function () {
    expect(collapseAll()([])).to.deep.equal([]);
  });

  it('returns rows with showingChildren set false', function () {
    const given = [
      {
        foo: 'bar'
      }
    ];
    const expected = [
      {
        foo: 'bar',
        showingChildren: false
      }
    ];

    expect(collapseAll()(given)).to.deep.equal(expected);
  });

  it('allows property to be customized', function () {
    const property = 'demo';
    const given = [
      {
        foo: 'bar'
      }
    ];
    const expected = [
      {
        foo: 'bar',
        [property]: false
      }
    ];

    expect(collapseAll({ property })(given)).to.deep.equal(expected);
  });
});
