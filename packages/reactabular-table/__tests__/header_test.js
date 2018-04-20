/* eslint-disable react/prop-types */
import React from 'react';
import TestUtils from 'react-dom/test-utils';
import * as Table from '../src';

describe('Table.Header', function () {
  it('can be customized', function () {
    const headerClass = 'test-header';
    const columns = [
      {
        headerCell: () => <td className={headerClass}>Name</td>
      }
    ];
    const table = TestUtils.renderIntoDocument(<Table.Provider columns={columns}>
      <Table.Header />
    </Table.Provider>);
    const th = TestUtils.findRenderedDOMComponentWithClass(table, headerClass);

    expect(th).toBeDefined();
  });

  it('renders children', function () {
    const testClass = 'test-header';
    const columns = [
      {
        headerCell: 'Name'
      }
    ];
    const table = TestUtils.renderIntoDocument(<Table.Provider columns={columns}>
      <Table.Header>
        <tr className={testClass}>
          <td>demo</td>
        </tr>
      </Table.Header>
    </Table.Provider>);
    const testElement = TestUtils.findRenderedDOMComponentWithClass(table, testClass);

    expect(testElement).toBeDefined();
  });

  it('renders based on `header` fields', function () {
    const columns = [
      {
        headerCell: ({ }, { renderer }) => renderer('Name')
      },
      {
        headerCell: ({ }, { renderer }) => renderer('Position')
      },
      {
        headerCell: ({ }, { renderer }) => renderer('Age')
      }
    ];
    const table = TestUtils.renderIntoDocument(<Table.Provider columns={columns}>
      <Table.Header />
    </Table.Provider>);
    const ths = TestUtils.scryRenderedDOMComponentsWithTag(table, 'th');

    expect(ths.length).toEqual(columns.length);
  });

  it('supports custom props', function () {
    const customClass = 'demo';

    const table = TestUtils.renderIntoDocument(<Table.Provider columns={[]}>
      <Table.Header className={customClass} />
    </Table.Provider>);
    const renderedTable = TestUtils.findRenderedDOMComponentWithClass(table, customClass);

    expect(renderedTable).toBeDefined();
  });

  it('gives access to header ref through getRef', function () {
    let ref;

    TestUtils.renderIntoDocument(<Table.Provider columns={[]}>
      <Table.Header
        ref={(r) => {
          ref = r;
        }}
      />
    </Table.Provider>);

    expect(ref).toBeDefined();
  });
});
