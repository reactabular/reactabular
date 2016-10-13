import { expect } from 'chai';
import { _columnMatches, strategies } from '../src';

describe('search._columnMatches', function () {
  it('returns matching query', function () {
    const query = 'foo';
    const result = _columnMatches({
      query,
      column: {
        property: 'demo'
      },
      row: {
        demo: 'foobar'
      }
    });

    expect(result).to.equal(true);
  });

  it('does not return missing query', function () {
    const query = 'zoo';
    const result = _columnMatches({
      query,
      column: {
        property: 'demo'
      },
      row: {
        demo: 'foobar'
      }
    });

    expect(result).to.equal(false);
  });

  it('accepts alternative strategy', function () {
    const query = 'oba';
    const result = _columnMatches({
      query,
      column: {
        property: 'demo'
      },
      row: {
        demo: 'foobar'
      },
      strategy: strategies.prefix
    });

    expect(result).to.equal(false);
  });

  it('accepts alternative casting strategy', function () {
    const query = 'foobar';
    const result = _columnMatches({
      query,
      column: {
        property: 'demo'
      },
      row: {
        demo: 'foo'
      },
      castingStrategy: v => `${v}bar`
    });

    expect(result).to.equal(true);
  });

  it('accepts alternative transform', function () {
    const query = 'oba';
    const result = _columnMatches({
      query,
      column: {
        property: 'demo'
      },
      row: {
        demo: 'foobar'
      },
      transform: v => v
    });

    expect(result).to.equal(true);
  });

  it('does not parse nested property', function () {
    const query = 'foo';
    const result = _columnMatches({
      query,
      column: {
        property: 'demo.another'
      },
      row: {
        demo: { another: 'foobar' },
        'demo.another': 'foobar'
      }
    });

    expect(result).to.equal(true);
  });

  it('does not cast arrays to strings', function () {
    const query = 'foo,bar';
    const result = _columnMatches({
      query,
      column: {
        property: 'demo'
      },
      row: {
        demo: ['foo', 'bar']
      }
    });

    expect(result).to.equal(false);
  });

  it('formats property', function () {
    const query = 'foo';
    const result = _columnMatches({
      query,
      column: {
        property: 'demo'
      },
      row: {
        demo: 'foobar',
        _demo: 'FOOBAR'
      },
      transform: v => v
    });

    expect(result).to.equal(false);
  });

  it('is not visible without a valid value', function () {
    const query = 'foo';
    const result = _columnMatches({
      query,
      column: {
        property: 'demo'
      },
      row: {
        demo: ['bar']
      },
      transform: v => v
    });

    expect(result).to.equal(false);
  });

  it('is not visible with undefined', function () {
    const query = 'foo';
    const result = _columnMatches({
      query,
      column: {
        property: 'demo'
      },
      row: {
        demo: undefined
      },
      transform: v => v
    });

    expect(result).to.equal(false);
  });

  it('does not crash with undefined rows', function () {
    const query = 'foo';
    const result = _columnMatches({
      query,
      column: {
        property: 'demo'
      },
      row: {
        demo: undefined
      },
      transform: v => v
    });

    expect(result).to.equal(false);
  });

  it('does not crash with a number', function () {
    const query = 'foo';
    const result = _columnMatches({
      query,
      column: {
        property: 'demo'
      },
      row: {
        demo: 22
      },
      transform: v => v
    });

    expect(result).to.equal(false);
  });

  it('does not crash with null rows', function () {
    const query = 'foo';
    const result = _columnMatches({
      query,
      column: {
        property: 'demo'
      },
      row: {
        demo: null
      },
      transform: v => v
    });

    expect(result).to.equal(false);
  });

  it('does not crash if value is false', function () {
    const query = 'foo';
    const result = _columnMatches({
      query,
      column: {
        property: 'demo'
      },
      row: {
        demo: false
      }
    });

    expect(result).to.equal(false);
  });

  it('does not crash if transformed to undefined', function () {
    const query = 'foo';
    const result = _columnMatches({
      query,
      column: {
        property: 'demo'
      },
      row: {
        demo: 'foobar'
      },
      resolve: () => undefined
    });

    expect(result).to.equal(true);
  });

  it('does not crash if transformed to null', function () {
    const query = 'foo';
    const result = _columnMatches({
      query,
      column: {
        property: 'demo'
      },
      row: {
        demo: 'foobar'
      },
      resolve: () => null
    });

    expect(result).to.equal(true);
  });

  it('does not crash without column', function () {
    const query = 'foo';
    const result = _columnMatches({
      query,
      row: {
        demo: 'foobar'
      }
    });

    expect(result).to.equal(false);
  });

  it('does not crash if transformed to false', function () {
    const query = 'foo';
    const result = _columnMatches({
      query,
      column: {
        property: 'demo'
      },
      row: {
        demo: 'foobar'
      },
      resolve: () => null
    });

    expect(result).to.equal(true);
  });
});
