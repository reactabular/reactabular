import { heightPropCheck } from '../body.js';

describe('height propType validator', function () {
  it('has no error when height is a number', function () {
    expect(
      heightPropCheck({ height: 50 }, 'height', 'VirtualizedBody')
    ).toBeUndefined();
  });

  it('has no error when style.maxHeight is a number', function () {
    expect(
      heightPropCheck({ style: { maxHeight: 50 } }, 'height', 'VirtualizedBody')
    ).toBeUndefined();
  });

  it('has an error when height and style.maxHeight are not provided', function () {
    expect(heightPropCheck({}, 'height', 'VirtualizedBody')).toBeDefined();
  });

  it('has an error when height is not a number', function () {
    expect(
      heightPropCheck({ height: '50px' }, 'height', 'VirtualizedBody')
    ).toBeDefined();
  });

  it('has an error when style.maxHeight is not a number', function () {
    expect(
      heightPropCheck({ style: { maxHeight: '50px' } }, 'height', 'VirtualizedBody')
    ).toBeDefined();
  });
});
