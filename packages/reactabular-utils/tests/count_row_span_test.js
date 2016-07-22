import { expect } from 'chai';
import { countRowSpan } from '../src';

describe('utils.countRowSpan', function () {
  it('returns one if there are no children', function () {
    const columns = [{
      foo: 'bar'
    }];

    expect(countRowSpan(columns)).to.equal(1);
  });

  it('returns two if there are only immediate children', function () {
    const childColumns = [{
      foo: 'bar'
    }];
    const columns = [{
      children: childColumns
    }];

    expect(countRowSpan(columns)).to.equal(2);
  });

  it('returns three if children have children', function () {
    const childColumns = [{
      foo: 'bar',
      children: [{
        bar: 'baz'
      }]
    }];
    const columns = [{
      children: childColumns
    }];

    expect(countRowSpan(columns)).to.equal(3);
  });
});
