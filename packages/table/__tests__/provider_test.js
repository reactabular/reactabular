/* eslint-disable react/prop-types */
import React from 'react';
import TestUtils from 'react-dom/test-utils';
import * as Table from '../src';

describe('Table.Provider', function () {
  it('renders children correctly', function () {
    const columns = [
      {
        property: 'name',
        headerCell: ({ renderer }) => renderer('Name'),
        bodyCell: ({ children, renderer }) => React.createElement(renderer, {}, children)
      },
      {
        property: 'position',
        headerCell: ({ }, { renderer }) => renderer('Position'),
        bodyCell: ({ children, renderer }) => React.createElement(renderer, {}, children)
      },
      {
        property: 'age',
        headerCell: ({ }, { renderer }) => renderer('Age'),
        bodyCell: ({ children, renderer }) => React.createElement(renderer, {}, children)
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
        property: 'name'
      },
      {
        property: 'position'
      },
      {
        property: 'age'
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
        property: 0,
        headerCell: ({ }, { renderer }) => renderer('A'),
        bodyCell: ({ children, renderer }) => React.createElement(renderer, {}, children)
      },
      {
        property: 1,
        headerCell: ({ }, { renderer }) => renderer('B'),
        bodyCell: ({ children, renderer }) => React.createElement(renderer, {}, children)
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
});
