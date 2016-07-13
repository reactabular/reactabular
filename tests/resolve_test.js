import { expect } from 'chai';
import { resolve } from '../src';

describe('resolve', function () {
  it('resolves normal properties', function () {
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
        name,
        _name: name
      }
    ];

    expect(resolve({ columns })(data)).to.deep.equal(expected);
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

    expect(resolve({ columns })(data)).to.deep.equal(expected);
  });

  it('does not warn for columns missing cell properties', function () {
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

    expect(resolve({ columns })(data)).to.deep.equal(expected);
  });

  it('resolves nested properties', function () {
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
        '_name.last': lastName
      }
    ];

    expect(resolve({ columns })(data)).to.deep.equal(expected);
  });

  it('resolves normal properties at a nested structure', function () {
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
        name,
        _name: name
      }
    ];

    expect(resolve({ columns })(data)).to.deep.equal(expected);
  });

  it('resolves nested properties at a nested structure', function () {
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
        '_name.last': lastName
      }
    ];

    expect(resolve({ columns })(data)).to.deep.equal(expected);
  });
});
