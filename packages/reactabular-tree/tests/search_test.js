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
});
