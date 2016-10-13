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

    expect(filter('showingChildren')(given)).to.deep.equal(given);
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

    expect(filter('showingChildren')(given)).to.deep.equal(expected);
  });
});
