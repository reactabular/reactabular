/* eslint-disable react/prop-types */
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import { mount } from 'enzyme';
import { expect } from 'chai';
import * as Table from '../src';

describe('Table.Body', function () {
  it('displays rows', function () {
    const columns = [
      {
        headerCell: 'Name',
        property: 'name'
      },
      {
        headerCell: 'Position',
        property: 'position'
      },
      {
        headerCell: 'Age',
        property: 'age'
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

    expect(trs.length).to.equal(rows.length);
  });

  it('allows body cell customization', function () {
    const customClass = 'foobar';
    const columns = [
      {
        headerCell: 'Name',
        property: 'name',
        bodyCell: name => <td className={customClass}>{name}</td>
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

    expect(trs.length).to.equal(rows.length);
  });

  it('does not resolve rows by default', function () {
    const lastName = 'foobar';
    const columns = [
      {
        headerCell: 'Last name',
        property: 'name.last'
      }
    ];
    const rows = [
      { name: { last: lastName }, id: 0 }
    ];
    const table = TestUtils.renderIntoDocument(<Table.Provider columns={columns}>
      <Table.Body rows={rows} rowKey="id" />
    </Table.Provider>);
    const td = TestUtils.findRenderedDOMComponentWithTag(table, 'td');

    expect(td.innerHTML).to.equal('');
  });

  it('allows Body shouldComponentUpdate to be overridden', function () {
    let calledUpdate = false;
    const BodyWrapper = props => <tbody {...props} />;
    BodyWrapper.shouldComponentUpdate = function () {
      expect(this.props).to.exist;

      calledUpdate = true;

      return true;
    };
    const columns = [
      {
        headerCell: 'Name',
        property: 'name'
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

    expect(calledUpdate).to.be.true;
  });

  it('allows BodyRow shouldComponentUpdate to be overridden', function () {
    let calledUpdate = false;
    const BodyWrapper = props => <tbody {...props} />;
    BodyWrapper.shouldComponentUpdate = function () {
      expect(this.props).to.exist;

      calledUpdate = true;

      return true;
    };
    const RowWrapper = props => <tr {...props} />;
    RowWrapper.shouldComponentUpdate = function () {
      expect(this.props).to.exist;

      calledUpdate = true;

      return true;
    };
    const columns = [
      {
        headerCell: 'Name',
        property: 'name'
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

    expect(calledUpdate).to.be.true;
  });

  it('supports custom props', function () {
    const customClass = 'demo';

    const table = TestUtils.renderIntoDocument(<Table.Provider columns={[]}>
      <Table.Body className={customClass} rows={[]} />
    </Table.Provider>);
    const renderedTable = TestUtils.findRenderedDOMComponentWithClass(table, customClass);

    expect(renderedTable).to.exist;
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

    expect(ref).to.exist;
  });

  it('allows attaching custom props per row through onRow', function () {
    let receivedRow;
    let receivedRowIndex;
    let receivedRowKey;
    const testRow = { name: 'demo' };
    const rowClass = 'test-row';
    const columns = [
      {
        headerCell: 'Name',
        property: 'name'
      }
    ];

    const table = TestUtils.renderIntoDocument(<Table.Provider columns={columns}>
      <Table.Body
        rows={[testRow]}
        rowKey="name"
        onRow={(row, { rowIndex, rowKey }) => {
          receivedRow = row;
          receivedRowIndex = rowIndex;
          receivedRowKey = rowKey;

          return {
            className: rowClass
          };
        }}
      />
    </Table.Provider>);
    const tr = TestUtils.findRenderedDOMComponentWithClass(table, rowClass);

    expect(receivedRow).to.deep.equal(testRow);
    expect(receivedRowIndex).to.equal(0);
    expect(receivedRowKey).to.equal(`${testRow.name}-row`);
    expect(tr).to.exist;
  });

  it('accepts a function for rowKey', function () {
    const cellClass = 'test-cell';
    const columns = [
      {
        headerCell: () => <th className={cellClass}>Age</th>,
        property: 'age'
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
    expect(key).to.equal(`${id}-row`);
  });

  it('rowKey function received rowIndex', function () {
    const cellClass = 'test-cell';
    const columns = [
      {
        headerCell: () => <th className={cellClass}>Age</th>,
        property: 'age'
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
    expect(key).to.equal(`${index}-row`);
  });

  it('allows passing custom row keys through _index', function () {
    const testIndex = 13;
    const testRow = { name: 'demo', _index: testIndex };
    const columns = [
      {
        headerCell: 'Name',
        property: 'name'
      }
    ];

    const table = TestUtils.renderIntoDocument(<Table.Provider columns={columns}>
      <Table.Body
        rows={[testRow]}
        rowKey="name"
        onRow={(row, { rowIndex }) => ({
          className: rowIndex
        })}
      />
    </Table.Provider>);
    const tr = TestUtils.findRenderedDOMComponentWithClass(table, testIndex.toString());

    expect(tr).to.exist;
  });
});
