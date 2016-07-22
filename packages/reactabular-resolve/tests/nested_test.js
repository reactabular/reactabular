import { expect } from 'chai';
import { nested } from '../';

describe('nested', function () {
  it('resolves nested values', function () {
    const lastName = 'demo';
    const property = 'name.last';
    const row = {
      name: {
        last: lastName
      }
    };
    const column = { cell: { property } };

    expect(nested(row, column)).to.deep.equal({ [property]: lastName });
  });

  it('resolves normal values', function () {
    const name = 'demo';
    const property = 'name';
    const row = {
      name
    };
    const column = { cell: { property } };

    expect(nested(row, column)).to.deep.equal({ [property]: name });
  });

  it('does nothing if there is no property', function () {
    const name = 'demo';
    const row = {
      name
    };
    const column = { cell: { property: undefined } };

    expect(nested(row, column)).to.deep.equal({});
  });

  it('does not crash without a property', function () {
    const name = 'demo';
    const row = {
      name
    };
    const column = { cell: {} };

    expect(nested(row, column)).to.deep.equal({});
  });

  it('does not crash without a cell', function () {
    const name = 'demo';
    const row = {
      name
    };
    const column = {};

    expect(nested(row, column)).to.deep.equal({});
  });
});
