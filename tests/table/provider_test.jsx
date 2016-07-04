/* eslint-disable react/prop-types */
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import { Table } from '../../src';

describe('Table.Provider', function () {
  it('renders children correctly', function () {
    const columns = [
      {
        header: {
          label: 'Name'
        },
        cell: {
          property: 'name'
        }
      },
      {
        header: {
          label: 'Position'
        },
        cell: {
          property: 'position'
        }
      },
      {
        header: {
          label: 'Age'
        },
        cell: {
          property: 'age'
        }
      }
    ];
    const data = [
      { name: 'foo', id: 0 },
      { position: 'demo', id: 1 },
      { age: 123, id: 2 }
    ];
    const table = TestUtils.renderIntoDocument(
      <Table.Provider columns={columns} data={data} rowKey="name">
        <tfoot>
          <tr>Dancing is the poetry of the foot.</tr>
        </tfoot>
      </Table.Provider>
    );
    const tfoot = TestUtils.findRenderedDOMComponentWithTag(table, 'tfoot');

    expect(tfoot).to.exist;
  });

  it('accepts numbers as properties', function () {
    const columns = [
      {
        header: {
          label: 'A'
        },
        cell: {
          property: 0
        }
      },
      {
        header: {
          label: 'B'
        },
        cell: {
          property: 1
        }
      }
    ];
    const data = [
      ['123', '234'],
      ['11', '1']
    ];
    const table = TestUtils.renderIntoDocument(
      <Table.Provider columns={columns} data={data}>
        <Table.Body />
      </Table.Provider>
    );
    const tds = TestUtils.scryRenderedDOMComponentsWithTag(
      table, 'td'
    );

    expect(tds.length).to.equal(4);
  });

  it('allows table component to be overridden', function () {
    const wrapperClass = 'wrapper';
    const wrapper = ({ children }) => (
      <div className={wrapperClass}>
        {children}
      </div>
    );

    const table = TestUtils.renderIntoDocument(
      <Table.Provider component={wrapper} columns={[]} data={[]}>
        <Table.Body />
      </Table.Provider>
    );
    const div = TestUtils.findRenderedDOMComponentWithClass(
      table, wrapperClass
    );

    expect(div).to.exist;
  });
});
