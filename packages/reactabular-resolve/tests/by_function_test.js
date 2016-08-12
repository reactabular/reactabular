import { expect } from 'chai';
import { byFunction } from '../src';

describe('resolve.byFunction', function () {
  it('does not resolve without a resolver', function () {
    const name = 'demo';
    const property = 'name';
    const row = {
      name
    };
    const column = {
      property
    };

    expect(
      byFunction('column.cell.resolve')(row, column)
    ).to.deep.equal({
      [property]: name
    });
  });

  it('resolves with a resolver', function () {
    const countries = { dk: 'Denmark' };
    const country = 'dk';
    const property = 'country';
    const row = {
      country
    };
    const column = {
      property,
      cell: {
        resolve: v => countries[v]
      }
    };

    expect(
      byFunction('cell.resolve')(row, column)
    ).to.deep.equal({
      [property]: country,
      [`_${property}`]: countries.dk
    });
  });

  it('retains data attributes', function () {
    const data = 'demo';
    const countries = { dk: 'Denmark' };
    const country = 'dk';
    const property = 'country';
    const row = {
      country,
      data
    };
    const column = {
      property,
      cell: {
        resolve: v => countries[v]
      }
    };

    expect(
      byFunction('cell.resolve')(row, column)
    ).to.deep.equal({
      data,
      [property]: country,
      [`_${property}`]: countries.dk
    });
  });
});
