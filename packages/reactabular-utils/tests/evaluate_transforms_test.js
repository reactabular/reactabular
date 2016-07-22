import { expect } from 'chai';
import { evaluateTransforms } from '../src';

describe('utils.evaluateTransforms', function () {
  it('transforms passed value', function () {
    const input = 10;
    const output = 10;
    const transforms = [value => ({ value })];

    expect(evaluateTransforms(transforms, input).value).to.equal(output);
  });

  it('accepts extra parameters passed to transforms', function () {
    const input = 10;
    const output = 'foo';
    const transforms = [(value, { result }) => ({ result })];

    expect(evaluateTransforms(
      transforms, input, { result: output }
    ).result).to.equal(output);
  });

  it('merges from left to right', function () {
    const output = 'foobar';
    const transforms = [
      () => ({ foo: 'foo' }),
      () => ({ foo: output })
    ];

    expect(evaluateTransforms(transforms).foo).to.equal(output);
  });

  it('performs a shallow merge', function () {
    const output = 'foobar';
    const transforms = [
      () => ({ foo: { bar: output } }),
      () => ({ foo: { zoo: output } })
    ];

    expect(evaluateTransforms(transforms).foo).to.deep.equal({
      zoo: output
    });
  });

  it('performs a deep merge for style', function () {
    const output = 'foobar';
    const transforms = [
      () => ({ style: { bar: output } }),
      () => ({ style: { zoo: output } })
    ];

    expect(evaluateTransforms(transforms).style).to.deep.equal({
      bar: output,
      zoo: output
    });
  });

  it('merges classNames', function () {
    const transforms = [
      () => ({ className: 'foo' }),
      () => ({ className: 'bar' }),
      () => ({ className: 'baz' })
    ];

    expect(evaluateTransforms(transforms).className).to.equal('foo bar baz');
  });

  it('returns an object without any input', function () {
    expect(evaluateTransforms()).to.deep.equal({});
  });
});
