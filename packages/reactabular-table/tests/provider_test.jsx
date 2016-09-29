/* eslint-disable react/prop-types */
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import * as Table from '../src';

describe('Table.Provider', function () {
  it('renders children correctly', function () {
    const columns = [
      {
        property: 'name',
        header: {
          label: 'Name'
        }
      },
      {
        property: 'position',
        header: {
          label: 'Position'
        }
      },
      {
        property: 'age',
        header: {
          label: 'Age'
        }
      }
    ];
    const table = TestUtils.renderIntoDocument(
      <Table.Provider columns={columns}>
        <tfoot>
          <tr>
            <td>Dancing is the poetry of the foot.</td>
          </tr>
        </tfoot>
      </Table.Provider>
    );
    const tfoot = TestUtils.findRenderedDOMComponentWithTag(table, 'tfoot');

    expect(tfoot).to.exist;
  });

  it('renders without headers', function () {
    const columns = [
      {
        property: 'name'
      },
      {
        property: 'position'
      },
      {
        property: 'age'
      }
    ];
    const table = TestUtils.renderIntoDocument(
      <Table.Provider columns={columns}>
        <tfoot>
          <tr>
            <td>Dancing is the poetry of the foot.</td>
          </tr>
        </tfoot>
      </Table.Provider>
    );
    const tfoot = TestUtils.findRenderedDOMComponentWithTag(table, 'tfoot');

    expect(tfoot).to.exist;
  });

  it('accepts numbers as properties', function () {
    const columns = [
      {
        property: 0,
        header: {
          label: 'A'
        }
      },
      {
        property: 1,
        header: {
          label: 'B'
        }
      }
    ];
    const rows = [
      ['123', '234'],
      ['11', '1']
    ];
    const table = TestUtils.renderIntoDocument(
      <Table.Provider columns={columns}>
        <Table.Body rows={rows} />
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
      <table className={wrapperClass}>
        {children}
      </table>
    );

    const table = TestUtils.renderIntoDocument(
      <Table.Provider components={{ table: wrapper }} columns={[]}>
        <Table.Body rows={[]} />
      </Table.Provider>
    );
    const div = TestUtils.findRenderedDOMComponentWithClass(
      table, wrapperClass
    );

    expect(div).to.exist;
  });

  it('supports custom props', function () {
    const customClass = 'demo';

    const table = TestUtils.renderIntoDocument(
      <Table.Provider columns={[]} className={customClass}>
        <Table.Body rows={[]} />
      </Table.Provider>
    );
    const renderedTable = TestUtils.findRenderedDOMComponentWithClass(
      table, customClass
    );

    expect(renderedTable).to.exist;
  });
});
