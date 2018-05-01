/* eslint-disable react/prop-types */
import React from 'react';
import TestUtils from 'react-dom/test-utils';
import * as Table from '../src';

describe('Table.Header', function () {
  it('can be customized with a function', function () {
    const name = 'Name';
    const headerClass = 'test-header';
    const columns = [
      {
        headerCell: () => <th className={headerClass}>{name}</th>
      }
    ];
    const table = TestUtils.renderIntoDocument(<Table.Provider columns={columns}>
      <Table.Header />
    </Table.Provider>);
    const th = TestUtils.findRenderedDOMComponentWithClass(table, headerClass);

    expect(th).toBeDefined();
    expect(th.innerHTML).toContain(name);
  });

  it('can be customized with an element', function () {
    const name = 'Name';
    const headerClass = 'test-header';
    const columns = [
      {
        headerCell: <th className={headerClass}>{name}</th>
      }
    ];
    const table = TestUtils.renderIntoDocument(<Table.Provider columns={columns}>
      <Table.Header />
    </Table.Provider>);
    const th = TestUtils.findRenderedDOMComponentWithClass(table, headerClass);

    expect(th).toBeDefined();
    expect(th.innerHTML).toContain(name);
  });

  it('can be customized with a string', function () {
    const name = 'Name';
    const columns = [
      {
        headerCell: name
      }
    ];
    const table = TestUtils.renderIntoDocument(<Table.Provider columns={columns}>
      <Table.Header />
    </Table.Provider>);
    const th = TestUtils.findRenderedDOMComponentWithTag(table, 'th');

    expect(th.innerHTML).toContain(name);
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

  it('allows attaching custom props per row through renderers', function () {
    let receivedRow;
    let receivedRowIndex;
    const rowClass = 'test-row';
    const columns = [
      {
        headerCell: 'Name',
        property: 'name'
      }
    ];
    const renderers = {
      header: {
        row: (children, o) => {
          receivedRow = o.rowData;
          receivedRowIndex = o.rowIndex;

          return <tr className={rowClass}>{children}</tr>;
        }
      }
    };

    const table = TestUtils.renderIntoDocument(<Table.Provider columns={columns} renderers={renderers}>
      <Table.Header/>
    </Table.Provider>);
    const tr = TestUtils.findRenderedDOMComponentWithClass(table, rowClass);

    expect(receivedRow).toEqual([columns[0]]);
    expect(receivedRowIndex).toBe(0);
    expect(tr).toBeDefined();
  });
});
