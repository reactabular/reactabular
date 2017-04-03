import { mergeProps } from '../src';

describe('utils.mergeProps', function () {
  it('empties are equal', function () {
    const oldProps = {};
    const newProps = {};

    expect(mergeProps(oldProps, newProps)).toEqual({});
  });

  it('merges simple', function () {
    const oldProps = {
      a: 'foo'
    };
    const newProps = {
      b: 'bar'
    };
    const expected = {
      a: 'foo',
      b: 'bar'
    };

    expect(mergeProps(oldProps, newProps)).toEqual(expected);
  });

  it('skips merging undefined I', function () {
    const oldProps = {
      a: 'foo'
    };
    const newProps = undefined;
    const expected = {
      a: 'foo'
    };

    expect(mergeProps(oldProps, newProps)).toEqual(expected);
  });

  it('skips merging undefined II', function () {
    const oldProps = undefined;
    const newProps = {
      a: 'foo'
    };
    const expected = {
      a: 'foo'
    };

    expect(mergeProps(oldProps, newProps)).toEqual(expected);
  });

  it('should not mutate first', function () {
    const oldProps = {
      a: 'foo'
    };
    const newProps = {
      b: 'bar'
    };
    const expected = {
      a: 'foo'
    };

    mergeProps(oldProps, newProps);

    expect(oldProps).toEqual(expected);
  });

  it('merges multiple', function () {
    const first = {
      a: 'foo'
    };
    const second = {
      b: 'bar'
    };
    const third = {
      c: 'zoo'
    };
    const expected = {
      a: 'foo',
      b: 'bar',
      c: 'zoo'
    };

    expect(mergeProps(first, second, third)).toEqual(expected);
  });

  it('merges children right to left', function () {
    const oldProps = {
      a: 'foo',
      children: {
        a: 'foo'
      }
    };
    const newProps = {
      b: 'bar',
      children: {
        a: 'bar'
      }
    };
    const expected = {
      a: 'foo',
      b: 'bar',
      children: {
        a: 'foo'
      }
    };

    expect(mergeProps(oldProps, newProps)).toEqual(expected);
  });

  it('merges multiple children right to left', function () {
    const a = {
      a: 'foo',
      children: {
        a: 'foo'
      }
    };
    const b = {
      b: 'bar',
      children: {
        a: 'bar'
      }
    };
    const c = {
      c: 'zoo',
      children: {
        a: 'zoo'
      }
    };
    const expected = {
      a: 'foo',
      b: 'bar',
      c: 'zoo',
      children: {
        a: 'foo'
      }
    };

    expect(mergeProps(a, b, c)).toEqual(expected);
  });

  it('merges class names', function () {
    const oldProps = {
      a: 'foo',
      className: 'foo'
    };
    const newProps = {
      b: 'bar',
      className: 'bar'
    };
    const expected = {
      a: 'foo',
      b: 'bar',
      className: 'foo bar'
    };

    expect(mergeProps(oldProps, newProps)).toEqual(expected);
  });

  it('merges multiple class names', function () {
    const a = {
      a: 'foo',
      className: 'foo'
    };
    const b = {
      b: 'bar',
      className: 'bar'
    };
    const c = {
      c: 'zoo',
      className: 'zoo'
    };
    const expected = {
      a: 'foo',
      b: 'bar',
      c: 'zoo',
      className: 'foo bar zoo'
    };

    expect(mergeProps(a, b, c)).toEqual(expected);
  });
});
