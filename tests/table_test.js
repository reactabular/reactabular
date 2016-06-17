import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Table from '../src/Table';
import { expect } from 'chai';

describe('Table', function () {
  it('should render a header based on `header` fields', function () {
    const columns = [
      {
        property: 'name',
        header: 'Name',
      },
      {
        property: 'position',
        header: 'Position',
      },
      {
        property: 'age',
        header: 'Age',
      },
    ];
    const table = TestUtils.renderIntoDocument(
      <Table columns={columns} data={[]}>
        <Table.Header />
      </Table>
    );

    const ths = TestUtils.scryRenderedDOMComponentsWithTag(
      table, 'th'
    );

    expect(ths.length).to.equal(columns.length);
  });

  it('should render content based on data', function () {
    const columns = [
      {
        property: 'name',
        header: 'Name',
      },
      {
        property: 'position',
        header: 'Position',
      },
      {
        property: 'age',
        header: 'Age',
      },
    ];
    const data = [
      { name: 'foo', id: 0 },
      { position: 'demo', id: 1 },
      { age: 123, id: 2 },
    ];
    const table = TestUtils.renderIntoDocument(
      <Table columns={columns} data={data}>
        <Table.Body rowKey="id" />
      </Table>
    );

    const trs = TestUtils.scryRenderedDOMComponentsWithTag(
      table, 'tr'
    );

    expect(trs.length).to.equal(data.length);
  });

  it('should accept functions for customizing cell value', function () {
    const columns = [
      {
        property: 'basic',
        header: 'Basic',
      },
      {
        property: 'identity',
        header: 'Identity',
        cell: ({ value }) => value,
      },
      {
        property: 'math',
        header: 'Simple Math',
        cell: ({ value }) => value - 23,
      },
    ];
    const data = [
      {
        basic: 'basic',
        identity: 'ident',
        math: 23, // deliberately chosen to make cell function return 0, a falsy value
        id: 0,
      },
    ];
    const table = TestUtils.renderIntoDocument(
      <Table columns={columns} data={data}>
        <Table.Body rowKey="id" />
      </Table>
    );

    const tds = TestUtils.scryRenderedDOMComponentsWithTag(table, 'td');
    expect(tds.length).to.equal(columns.length);
    expect(tds[0].innerHTML).to.equal('basic');
    expect(tds[1].innerHTML).to.equal('ident');
    expect(tds[2].innerHTML).to.equal('0');
  });

  it('should accept function based React components for customizing value', function () {
    const columns = [
      {
        property: 'complex',
        header: 'Cell Props',
        cell: ({ value }) => <span className="complex">{value}</span>,
      },
      {
        property: 'jsx',
        header: 'JSX',
        cell: ({ value }) => <a href={`http://${value.id}`}>{value.name}</a>,
      },
    ];
    const data = [
      {
        basic: 'basic',
        identity: 'ident',
        math: 23, // deliberately chosen to make cell function return 0, a falsy value
        complex: 'somestr',
        jsx: { id: 'some_id_123', name: 'helloworld' },
        id: 0,
      },
    ];
    const table = TestUtils.renderIntoDocument(
      <Table columns={columns} data={data}>
        <Table.Body rowKey="id" />
      </Table>
    );

    const tds = TestUtils.scryRenderedDOMComponentsWithTag(table, 'td');
    expect(tds.length).to.equal(columns.length);

    // TODO: should cell just return a td instead?
    expect(tds[0].children[0].className).to.equal('complex');

    /* TODO: push to a separate test
    const link = TestUtils.findRenderedDOMComponentWithTag(table, 'a');
    expect(link.parentNode).to.equal(tds[4]);
    expect(link.href).to.equal('http://some_id_123/');
    expect(link.innerHTML).to.equal('helloworld');
    */
  });

  it('should render children correctly', function () {
    const columns = [
      {
        property: 'name',
        header: 'Name',
      },
      {
        property: 'position',
        header: 'Position',
      },
      {
        property: 'age',
        header: 'Age',
      },
    ];
    const data = [
      { name: 'foo', id: 0 },
      { position: 'demo', id: 1 },
      { age: 123, id: 2 },
    ];
    const table = TestUtils.renderIntoDocument(
      <Table columns={columns} data={data}>
        <tfoot>
          <tr>Dancing is the poetry of the foot.</tr>
        </tfoot>
      </Table>
    );

    const tfoot = TestUtils.findRenderedDOMComponentWithTag(table, 'tfoot');
    expect(tfoot).to.exist;
  });
});
