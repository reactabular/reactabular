import { expect } from 'chai';
import { resolve } from '../src';

const { nested } = resolve;

describe('resolve.nested', function () {
  it('resolves normal nested', function () {
    const name = 'Demo';
    const columns = [
      {
        header: {
          label: 'Last name'
        },
        cell: {
          property: 'name'
        }
      }
    ];
    const data = [
      { name }
    ];
    const expected = [
      {
        name
      }
    ];

    expect(nested({ columns })(data)).to.deep.equal(expected);
  });

  it('does not warn for columns missing cells', function () {
    const name = 'Demo';
    const columns = [
      {
        header: {
          label: 'Last name'
        }
      }
    ];
    const data = [
      { name }
    ];
    const expected = [
      {
        name
      }
    ];

    expect(nested({ columns })(data)).to.deep.equal(expected);
  });

  it('does not warn for columns missing cell nested', function () {
    const name = 'Demo';
    const columns = [
      {
        header: {
          label: 'Last name'
        },
        cell: {
          format: v => v
        }
      }
    ];
    const data = [
      { name }
    ];
    const expected = [
      {
        name
      }
    ];

    expect(nested({ columns })(data)).to.deep.equal(expected);
  });

  it('resolves nested nested', function () {
    const lastName = 'foobar';
    const columns = [
      {
        header: {
          label: 'Last name'
        },
        cell: {
          property: 'name.last'
        }
      }
    ];
    const data = [
      { name: { last: lastName } }
    ];
    const expected = [
      {
        name: { last: lastName },
        'name.last': lastName
      }
    ];

    expect(nested({ columns })(data)).to.deep.equal(expected);
  });

  it('resolves normal nested at a nested structure', function () {
    const name = 'Demo';
    const columns = [
      {
        header: {
          label: 'Last name'
        },
        children: [
          {
            header: {
              label: 'First Name'
            },
            cell: {
              property: 'name'
            }
          }
        ]
      }
    ];
    const data = [
      { name }
    ];
    const expected = [
      {
        name
      }
    ];

    expect(nested({ columns })(data)).to.deep.equal(expected);
  });

  it('resolves nested nested at a nested structure', function () {
    const lastName = 'foobar';
    const columns = [
      {
        header: {
          label: 'Last name'
        },
        children: [
          {
            header: {
              label: 'First Name'
            },
            cell: {
              property: 'name.last'
            }
          }
        ]
      }
    ];
    const data = [
      { name: { last: lastName } }
    ];
    const expected = [
      {
        name: { last: lastName },
        'name.last': lastName
      }
    ];

    expect(nested({ columns })(data)).to.deep.equal(expected);
  });

  it('throws an error if columns are not passed', function () {
    expect(nested).to.throw(Error);
  });
});
