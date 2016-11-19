import { expect } from 'chai';
import { getColumnByIndex } from '../src';

describe('getColumnByIndex', function () {
  it('gets flat column', function () {
    const columns = [
      {
        property: 'demo'
      }
    ];

    expect(getColumnByIndex(columns, 0)).to.deep.equal(columns[0]);
  });

  it('gets nested column', function () {
    const columns = [
      {
        header: {
          label: 'Name'
        },
        children: [
          {
            property: 'name.first',
            header: {
              label: 'First Name'
            }
          },
          {
            property: 'name.last',
            header: {
              label: 'Last Name'
            }
          }
        ]
      },
      {
        property: 'demo'
      }
    ];

    expect(getColumnByIndex(columns, 0)).to.deep.equal(columns[0].children[0]);
    expect(getColumnByIndex(columns, 1)).to.deep.equal(columns[0].children[1]);
    expect(getColumnByIndex(columns, 2)).to.deep.equal(columns[1]);
  });
});
