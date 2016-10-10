import { expect } from 'chai';
import { expandAll } from '../src';

describe('tree.expandAll', function () {
  it('returns empty rows if empty rows are passed', function () {
    expect(expandAll([])).to.deep.equal([]);
  });

  it('returns rows with showingChildren set true', function () {
    const given = [
      {
        foo: 'bar'
      }
    ];
    const expected = [
      {
        foo: 'bar',
        showingChildren: true
      }
    ];

    expect(expandAll(given)).to.deep.equal(expected);
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
        [property]: true
      }
    ];

    expect(expandAll(given, property)).to.deep.equal(expected);
  });
});
