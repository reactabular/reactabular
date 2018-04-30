/* eslint-disable react/prop-types */
import React from 'react';
import TestUtils from 'react-dom/test-utils';
import * as Table from '../src';

describe('Table.Provider', function () {
  it('renders children correctly', function () {
    const columns = [
      {
        headerCell: ({ }, { renderer }) => renderer('Name'),
        bodyCell: ({ name }, { renderer }) => renderer(name)
      },
      {
        headerCell: ({ }, { renderer }) => renderer('Position'),
        bodyCell: ({ position }, { renderer }) => renderer(position)
      },
      {
        headerCell: ({ }, { renderer }) => renderer('Age'),
        bodyCell: ({ age }, { renderer }) => renderer(age)
      }
    ];
    const table = TestUtils.renderIntoDocument(<Table.Provider columns={columns}>
      <tfoot>
        <tr>
          <td>Dancing is the poetry of the foot.</td>
        </tr>
      </tfoot>
    </Table.Provider>);
    const tfoot = TestUtils.findRenderedDOMComponentWithTag(table, 'tfoot');

    expect(tfoot).toBeDefined();
  });

  it('renders without headers', function () {
    const columns = [
      {
        bodyCell: ({ name }, { renderer }) => renderer(name)
      },
      {
        bodyCell: ({ position }, { renderer }) => renderer(position)
      },
      {
        bodyCell: ({ age }, { renderer }) => renderer(age)
      }
    ];
    const table = TestUtils.renderIntoDocument(<Table.Provider columns={columns}>
      <tfoot>
        <tr>
          <td>Dancing is the poetry of the foot.</td>
        </tr>
      </tfoot>
    </Table.Provider>);
    const tfoot = TestUtils.findRenderedDOMComponentWithTag(table, 'tfoot');

    expect(tfoot).toBeDefined();
  });

  it('accepts numbers as properties', function () {
    const columns = [
      {
        headerCell: ({ }, { renderer }) => renderer('A'),
        bodyCell: (row, { renderer }) => renderer(row[0])
      },
      {
        headerCell: ({ }, { renderer }) => renderer('B'),
        bodyCell: (row, { renderer }) => renderer(row[1])
      }
    ];
    const rows = [
      ['123', '234'],
      ['11', '1']
    ];
    const table = TestUtils.renderIntoDocument(<Table.Provider columns={columns}>
      <Table.Body rows={rows} />
    </Table.Provider>);
    const tds = TestUtils.scryRenderedDOMComponentsWithTag(table, 'td');

    expect(tds.length).toBe(4);
  });

  it('allows table component to be overridden', function () {
    const wrapperClass = 'wrapper';
    const wrapper = ({ children }) => (
      <table className={wrapperClass}>
        {children}
      </table>
    );

    const table = TestUtils.renderIntoDocument(<Table.Provider renderers={{ table: wrapper }} columns={[]}>
      <Table.Body rows={[]} />
    </Table.Provider>);
    const div = TestUtils.findRenderedDOMComponentWithClass(table, wrapperClass);

    expect(div).toBeDefined();
  });

  it('supports custom props', function () {
    const customClass = 'demo';

    const table = TestUtils.renderIntoDocument(<Table.Provider columns={[]} className={customClass}>
      <Table.Body rows={[]} />
    </Table.Provider>);
    const renderedTable = TestUtils.findRenderedDOMComponentWithClass(table, customClass);

    expect(renderedTable).toBeDefined();
  });
});
