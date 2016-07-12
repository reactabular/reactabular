import { expect } from 'chai';
import {
  resolveHeaderRows, countRowSpan,
  resolveBodyColumns, evaluateTransforms, mergeClassNames
} from '../../src/table/utils';

describe('resolveHeaderRows', function () {
  it('returns columns wrapped in an array', function () {
    const column = {
      foo: 'bar'
    };
    const columns = [column];
    const expected = [
      [
        {
          ...column,
          props: {
            rowSpan: 1
          }
        }
      ]
    ];

    expect(resolveHeaderRows(columns)).to.deep.equal(expected);
  });

  it('passes props to column result', function () {
    const props = {
      bar: 'bar'
    };
    const column = {
      foo: 'bar',
      props
    };
    const columns = [column];
    const expected = [
      [
        {
          ...column,
          props: {
            ...props,
            rowSpan: 1
          }
        }
      ]
    ];

    expect(resolveHeaderRows(columns)).to.deep.equal(expected);
  });

  it('returns columns with child wrapped in an array', function () {
    const childColumn = {
      bar: 'foo'
    };
    const column = {
      foo: 'bar',
      children: [
        childColumn
      ]
    };
    const columns = [column];
    const expected = [
      [
        {
          foo: column.foo,
          props: {
            colSpan: 1
          }
        }
      ],
      [
        {
          ...childColumn,
          props: {
            rowSpan: 1
          }
        }
      ]
    ];

    expect(resolveHeaderRows(columns)).to.deep.equal(expected);
  });

  it('calculates colSpan based on children', function () {
    const childColumn = {
      bar: 'foo'
    };
    const column = {
      foo: 'bar',
      children: [
        childColumn,
        childColumn
      ]
    };
    const columns = [column];
    const expected = [
      [
        {
          foo: column.foo,
          props: {
            colSpan: 2
          }
        }
      ],
      [
        {
          ...childColumn,
          props: {
            rowSpan: 1
          }
        },
        {
          ...childColumn,
          props: {
            rowSpan: 1
          }
        }
      ]
    ];

    expect(resolveHeaderRows(columns)).to.deep.equal(expected);
  });

  it('calculates rowSpan based on siblings', function () {
    const basicColumn = {
      bar: 'foo'
    };
    const column = {
      foo: 'bar',
      children: [
        basicColumn,
        basicColumn
      ]
    };
    const columns = [basicColumn, column];
    const expected = [
      [
        {
          ...basicColumn,
          props: {
            rowSpan: 2
          }
        },
        {
          foo: column.foo,
          props: {
            colSpan: 2
          }
        }
      ],
      [
        {
          ...basicColumn,
          props: {
            rowSpan: 1
          }
        },
        {
          ...basicColumn,
          props: {
            rowSpan: 1
          }
        }
      ]
    ];

    expect(resolveHeaderRows(columns)).to.deep.equal(expected);
  });
});

describe('countRowSpan', function () {
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

describe('resolveBodyColumns', function () {
  it('does not resolve if a column does not have children', function () {
    const columns = [{
      foo: 'bar'
    }];

    expect(resolveBodyColumns(columns)).to.deep.equal(columns);
  });

  it('resolves if a column has children', function () {
    const childColumns = [{
      foo: 'bar'
    }];
    const columns = [{
      children: childColumns
    }];

    expect(resolveBodyColumns(columns)).to.deep.equal(childColumns);
  });
});

describe('evaluateTransforms', function () {
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

describe('mergeClassNames', function () {
  it('merges two', function () {
    const a = 'foo';
    const b = 'bar';
    const expected = `${a} ${b}`;

    expect(mergeClassNames(a, b)).to.equal(expected);
  });

  it('merges one', function () {
    const a = 'foo';
    const b = '';
    const expected = `${a}`;

    expect(mergeClassNames(a, b)).to.equal(expected);
  });

  it('merges none', function () {
    const a = '';
    const b = '';
    const expected = '';

    expect(mergeClassNames(a, b)).to.equal(expected);
  });
});
