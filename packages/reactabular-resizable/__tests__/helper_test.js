import { helper as resizableHelper } from '../src';

describe('helper', function () {
  it('merges column class names correctly', function () {
    const columns = [
      {
        property: 'demo',
        props: {
          className: 'demo'
        },
        visible: true
      }
    ];
    const expected = [
      {
        property: 'demo',
        props: {
          className: 'demo column-foo-bar'
        },
        visible: true
      }
    ];
    const helper = resizableHelper({
      globalId: 'foo',
      getId: () => 'bar'
    });

    expect(helper.initialize(columns)).toEqual(expected);
  });
});
