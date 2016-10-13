import { expect } from 'chai';
import { sort } from '../src';

describe('tree.sort', function () {
  it('returns empty rows if empty rows are passed', function () {
    expect(sort({ columns: [], query: {} })([])).to.deep.equal([]);
  });

  it('returns sorted rows', function () {
    const given = [
      {
        foo: 'zoo'
      },
      {
        foo: 'bar'
      }
    ];
    const columns = [
      {
        property: 'foo'
      }
    ];
    const sortingColumns = {
      0: {
        direction: 'asc',
        position: 0
      }
    };
    const expected = [
      {
        foo: 'bar'
      },
      {
        foo: 'zoo'
      }
    ];

    expect(sort({ columns, sortingColumns })(given)).to.deep.equal(expected);
  });
});
