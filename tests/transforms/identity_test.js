import identity from '../../src/transforms/identity.js';
import { expect } from 'chai';

describe('identity', function () {
  it('formats correctly', function () {
    const value = 'never odd or even';

    expect(identity(value)).to.deep.equal({ value });
  });
});
