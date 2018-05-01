/* eslint-disable react/prop-types */
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import { mount } from 'enzyme';
import * as Table from '../src';

describe('Table.Body', function () {
  it('displays rows', function () {
    const columns = [
      {
        headerCell: 'Name',
        bodyCell: ({ name }, { renderer }) => renderer(name)
      },
      {
        headerCell: 'Position',
        bodyCell: ({ position }, { renderer }) => renderer(position)
      },
      {
        headerCell: 'Age',
        bodyCell: ({ age }, { renderer }) => renderer(age)
      }
    ];
    const rows = [
      {
        position: 'foo', age: 111, name: 'foo', id: 0
      },
      {
        position: 'demo', age: 333, name: 'boo', id: 1
      },
      {
        position: 'demo 2', age: 123, name: 'demo', id: 2
      }
    ];
    const table = TestUtils.renderIntoDocument(<Table.Provider columns={columns}>
      <Table.Body rows={rows} rowKey="id" />
    </Table.Provider>);
    const trs = TestUtils.scryRenderedDOMComponentsWithTag(table, 'tr');

    expect(trs.length).toBe(rows.length);
  });

  it('allows body cell customization with a function', function () {
    const customClass = 'foobar';
    const columns = [
      {
        headerCell: 'Name',
        bodyCell: ({ name }) => <td className={customClass}>{name}</td>
      }
    ];
    const rows = [
      {
        name: 'foo', id: 0
      },
      {
        name: 'boo', id: 1
      },
      {
        name: 'demo', id: 2
      }
    ];
    const table = TestUtils.renderIntoDocument(<Table.Provider columns={columns}>
      <Table.Body rows={rows} rowKey="id" />
    </Table.Provider>);
    const trs = TestUtils.scryRenderedDOMComponentsWithTag(table, 'tr');

    expect(trs.length).toBe(rows.length);
  });

  it('allows body cell customization with an element', function () {
    const name = 'Name';
    const customClass = 'foobar';
    const columns = [
      {
        headerCell: 'Name',
        bodyCell: <td className={customClass}>{name}</td>
      }
    ];
    const rows = [
      {
        name: 'foo', id: 0
      },
      {
        name: 'boo', id: 1
      },
      {
        name: 'demo', id: 2
      }
    ];
    const table = TestUtils.renderIntoDocument(<Table.Provider columns={columns}>
      <Table.Body rows={rows} rowKey="id" />
    </Table.Provider>);
    const trs = TestUtils.scryRenderedDOMComponentsWithTag(table, 'tr');
    const tds = TestUtils.scryRenderedDOMComponentsWithTag(table, 'td');

    expect(trs.length).toBe(rows.length);
    expect(tds[0].innerHTML).toEqual(name);
  });

  it('allows body cell customization with a string', function () {
    const name = 'Name';
    const columns = [
      {
        headerCell: 'Name',
        bodyCell: ({}, { renderer }) => renderer(name)
      }
    ];
    const rows = [
      {
        name: 'foo', id: 0
      },
      {
        name: 'boo', id: 1
      },
      {
        name: 'demo', id: 2
      }
    ];
    const table = TestUtils.renderIntoDocument(<Table.Provider columns={columns}>
      <Table.Body rows={rows} rowKey="id" />
    </Table.Provider>);
    const trs = TestUtils.scryRenderedDOMComponentsWithTag(table, 'tr');
    const tds = TestUtils.scryRenderedDOMComponentsWithTag(table, 'td');

    expect(trs.length).toBe(rows.length);
    expect(tds[0].innerHTML).toEqual(name);
  });

  it('allows Body shouldComponentUpdate to be overridden', function () {
    let calledUpdate = false;
    const BodyWrapper = props => <tbody {...props} />;
    BodyWrapper.shouldComponentUpdate = function () {
      expect(this.props).toBeDefined();

      calledUpdate = true;

      return true;
    };
    const columns = [
      {
        headerCell: 'Name',
        bodyCell: ({ name }, { renderer }) => renderer(name)
      }
    ];
    const rows = [{ name: 'demo' }];

    const node = document.createElement('div');
    const component = ReactDOM.render( // eslint-disable-line react/no-render-return-value
      <Table.Provider
        columns={columns}
        renderers={{
          body: {
            wrapper: BodyWrapper
          }
        }}
      >
        <Table.Body
          rows={rows}
          rowKey="name"
        />
      </Table.Provider>,
      node
    );

    component.forceUpdate();

    expect(calledUpdate).toBe(true);
  });

  it('allows BodyRow shouldComponentUpdate to be overridden', function () {
    let calledUpdate = false;
    const BodyWrapper = props => <tbody {...props} />;
    BodyWrapper.shouldComponentUpdate = function () {
      expect(this.props).toBeDefined();

      calledUpdate = true;

      return true;
    };
    const RowWrapper = props => <tr {...props} />;
    RowWrapper.shouldComponentUpdate = function () {
      expect(this.props).toBeDefined();

      calledUpdate = true;

      return true;
    };
    const columns = [
      {
        headerCell: 'Name',
        bodyCell: ({ name }, { renderer }) => renderer(name)
      }
    ];
    const rows = [{ name: 'demo' }];

    const node = document.createElement('div');
    const component = ReactDOM.render( // eslint-disable-line react/no-render-return-value
      <Table.Provider
        columns={columns}
        renderers={{
          body: {
            wrapper: BodyWrapper, // Needed as otherwise it won't get to row
            row: RowWrapper
          }
        }}
      >
        <Table.Body
          rows={rows}
          rowKey="name"
        />
      </Table.Provider>,
      node
    );

    component.forceUpdate();

    expect(calledUpdate).toBe(true);
  });

  it('gives access to body ref through getRef', function () {
    let ref;

    TestUtils.renderIntoDocument(<Table.Provider columns={[]}>
      <Table.Body
        rows={[]}
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
    let receivedColumns;
    const testRow = { name: 'demo' };
    const rowClass = 'test-row';
    const columns = [
      {
        headerCell: 'Name',
        bodyCell: ({ name }, { renderer }) => renderer(name)
      }
    ];
    const renderers = {
      body: {
        row: (children, o) => {
          receivedRow = o.rowData;
          receivedRowIndex = o.rowIndex;
          receivedColumns = o.columns;

          return <tr className={rowClass}>{children}</tr>;
        }
      }
    };

    const table = TestUtils.renderIntoDocument(<Table.Provider columns={columns} renderers={renderers}>
      <Table.Body
        rows={[testRow]}
        rowKey="name"
      />
    </Table.Provider>);
    const tr = TestUtils.findRenderedDOMComponentWithClass(table, rowClass);

    expect(receivedRow).toEqual(testRow);
    expect(receivedRowIndex).toBe(0);
    expect(receivedColumns).toEqual(columns);
    expect(tr).toBeDefined();
  });

  it('accepts a function for rowKey', function () {
    const cellClass = 'test-cell';
    const columns = [
      {
        headerCell: () => <th className={cellClass}>Age</th>,
        bodyCell: ({ age }, { renderer }) => renderer(age)
      }
    ];
    const id = 0;
    const rows = [
      {
        position: 'foo', age: 111, name: 'foo', nested: { id }
      }
    ];

    const table = mount(<Table.Provider columns={columns}>
      <Table.Body rows={rows} rowKey={({ rowData }) => rowData.nested.id} />
    </Table.Provider>);

    const key = table.find('BodyRow').prop('rowKey');
    expect(key).toBe(`${id}-row`);
  });

  it('rowKey function received rowIndex', function () {
    const cellClass = 'test-cell';
    const columns = [
      {
        headerCell: () => <th className={cellClass}>Age</th>,
        bodyCell: ({ age }, { renderer }) => renderer(age)
      }
    ];
    const index = 0;
    const rows = [
      { position: 'foo', age: 111, name: 'foo' }
    ];
    const table = mount(<Table.Provider columns={columns}>
      <Table.Body rows={rows} rowKey={({ rowIndex }) => rowIndex} />
    </Table.Provider>);

    const key = table.find('BodyRow').prop('rowKey');
    expect(key).toBe(`${index}-row`);
  });

  it('allows passing custom row keys through _index', function () {
    const testIndex = 13;
    const testRow = { name: 'demo', _index: testIndex };
    const columns = [
      {
        headerCell: 'Name',
        bodyCell: ({ name }, { renderer }) => renderer(name)
      }
    ];
    const renderers = {
      body: {
        row: (children, { rowIndex }) => <tr className={rowIndex}>{children}</tr>
      }
    };

    const table = TestUtils.renderIntoDocument(<Table.Provider columns={columns} renderers={renderers}>
      <Table.Body
        rows={[testRow]}
        rowKey="name"
      />
    </Table.Provider>);
    const tr = TestUtils.findRenderedDOMComponentWithClass(table, testIndex.toString());

    expect(tr).toBeDefined();
  });
});
