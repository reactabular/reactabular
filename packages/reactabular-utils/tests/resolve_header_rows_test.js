import { expect } from 'chai';
import { resolveHeaderRows } from '../src';

describe('utils.resolveHeaderRows', function () {
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
