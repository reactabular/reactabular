import identity from '../../src/formatters/identity.js';
import { expect } from 'chai';

describe('identity', function () {
  it('formats correctly', function () {
    const value = 'evil olive';

    expect(identity(value)).to.equal(value);
  });
});
