import { evaluateFormatters } from '../src';

describe('utils.evaluateFormatters', function () {
  it('evaluates empty', function () {
    const formatters = [];

    expect(evaluateFormatters(formatters)()).toEqual(undefined);
  });

  it('evaluates single', function () {
    const testValue = 'test value';
    const formatters = [value => value];

    expect(evaluateFormatters(formatters)(testValue)).toEqual(testValue);
  });

  it('evaluates single with extra', function () {
    const testValue = 'test value';
    const formatters = [(_, extra) => extra];

    expect(evaluateFormatters(formatters)('', testValue)).toEqual(testValue);
  });

  it('evaluates multiple', function () {
    const formatters = [
      () => 'foo',
      value => `bar${value}bar`
    ];

    expect(evaluateFormatters(formatters)()).toEqual('barfoobar');
  });

  it('evaluates multiple with extra', function () {
    const extraValue = 'zoo';
    const formatters = [
      () => 'foo',
      (value, extra) => `bar${value}bar${extra}`
    ];

    expect(
      evaluateFormatters(formatters)('', extraValue)
    ).toEqual(`barfoobar${extraValue}`);
  });
});
