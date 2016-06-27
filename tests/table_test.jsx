/* eslint-disable react/prop-types */
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { Table } from '../src';
import { expect } from 'chai';

describe('Table', function () {
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
      <Table columns={columns} data={data} rowKey="name">
        <tfoot>
          <tr>Dancing is the poetry of the foot.</tr>
        </tfoot>
      </Table>
    );
    const tfoot = TestUtils.findRenderedDOMComponentWithTag(table, 'tfoot');

    expect(tfoot).to.exist;
  });
});

describe('Table.Header', function () {
  it('can be formatted', function () {
    const headerClass = 'test-header';
    const columns = [
      {
        header: {
          label: 'Name',
          format: name => <span className={headerClass}>{name}</span>
        }
      }
    ];
    const table = TestUtils.renderIntoDocument(
      <Table columns={columns} data={[]} rowKey="name">
        <Table.Header />
      </Table>
    );
    const th = TestUtils.findRenderedDOMComponentWithClass(
      table, headerClass
    );

    expect(th).to.exist;
  });

  it('renders based on `header` fields', function () {
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
    const table = TestUtils.renderIntoDocument(
      <Table columns={columns} data={[]} rowKey="name">
        <Table.Header />
      </Table>
    );
    const ths = TestUtils.scryRenderedDOMComponentsWithTag(
      table, 'th'
    );

    expect(ths.length).to.equal(columns.length);
  });

  it('can be transformed', function () {
    const headerClass = 'test-header';
    const columns = [
      {
        header: {
          label: 'Name',
          transform: () => ({
            className: headerClass
          })
        }
      }
    ];
    const table = TestUtils.renderIntoDocument(
      <Table columns={columns} data={[]} rowKey="name">
        <Table.Header />
      </Table>
    );
    const th = TestUtils.findRenderedDOMComponentWithClass(
      table, headerClass
    );

    expect(th).to.exist;
  });

  it('can be transformed while retaining classNames', function () {
    const headerClass = 'test-header';
    const anotherHeaderClass = 'another-header';
    const label = 'Name';
    const columns = [
      {
        header: {
          label,
          transform: () => ({
            className: headerClass
          })
        }
      }
    ];
    const table = TestUtils.renderIntoDocument(
      <Table columns={columns} data={[]} rowKey="name">
        <Table.Header className={anotherHeaderClass} />
      </Table>
    );
    const th = TestUtils.findRenderedDOMComponentWithClass(
      table, headerClass
    );

    expect(th.innerHTML).to.equal(label);
    expect(th.className).to.equal(`${anotherHeaderClass} ${headerClass}`);
  });
});

describe('Table.Body', function () {
  it('displays data', function () {
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
      { position: 'foo', age: 111, name: 'foo', id: 0 },
      { position: 'demo', age: 333, name: 'boo', id: 1 },
      { position: 'demo 2', age: 123, name: 'demo', id: 2 }
    ];
    const table = TestUtils.renderIntoDocument(
      <Table columns={columns} data={data} rowKey="id">
        <Table.Body />
      </Table>
    );
    const trs = TestUtils.scryRenderedDOMComponentsWithTag(
      table, 'tr'
    );

    expect(trs.length).to.equal(data.length);
  });

  it('can be formatted', function () {
    const columns = [
      {
        header: {
          label: 'Basic'
        },
        cell: {
          property: 'basic'
        }
      },
      {
        header: {
          label: 'Identity'
        },
        cell: {
          property: 'identity',
          format: value => value
        }
      },
      {
        header: {
          label: 'Simple Math'
        },
        cell: {
          property: 'math',
          format: value => value - 23
        }
      }
    ];
    const data = [
      {
        basic: 'basic',
        identity: 'ident',
        math: 23, // deliberately chosen to make cell function return 0, a falsy value
        id: 0
      }
    ];
    const table = TestUtils.renderIntoDocument(
      <Table columns={columns} data={data} rowKey="id">
        <Table.Body />
      </Table>
    );
    const tds = TestUtils.scryRenderedDOMComponentsWithTag(table, 'td');

    expect(tds.length).to.equal(columns.length);
    expect(tds[0].innerHTML).to.equal('basic');
    expect(tds[1].innerHTML).to.equal('ident');
    expect(tds[2].innerHTML).to.equal('0');
  });

  it('can be formatted using React components', function () {
    const columns = [
      {
        header: {
          label: 'Cell Props'
        },
        cell: {
          property: 'complex',
          format: value => <span className="complex">{value}</span>
        }
      },
      {
        header: {
          label: 'JSX'
        },
        cell: {
          property: 'jsx',
          format: value => <a href={`http://${value.id}`}>{value.name}</a>
        }
      }
    ];
    const data = [
      {
        basic: 'basic',
        identity: 'ident',
        math: 23, // deliberately chosen to make cell function return 0, a falsy value
        complex: 'somestr',
        jsx: { id: 'some_id_123', name: 'helloworld' },
        id: 0
      }
    ];
    const table = TestUtils.renderIntoDocument(
      <Table columns={columns} data={data} rowKey="id">
        <Table.Body />
      </Table>
    );
    const tds = TestUtils.scryRenderedDOMComponentsWithTag(table, 'td');

    expect(tds.length).to.equal(columns.length);
    expect(tds[0].children[0].className).to.equal('complex');
  });

  it('can be transformed while retaining classNames', function () {
    const cellClass = 'test-cell';
    const anotherCellClass = 'another-cell';
    const columns = [
      {
        header: {
          label: 'Name'
        },
        cell: {
          property: 'name',
          transform: () => ({
            className: cellClass
          })
        }
      }
    ];
    const table = TestUtils.renderIntoDocument(
      <Table columns={columns} data={[{ name: 'demo' }]} rowKey="name">
        <Table.Body className={anotherCellClass} />
      </Table>
    );
    const td = TestUtils.findRenderedDOMComponentWithClass(
      table, cellClass
    );

    expect(td.className).to.equal(`${anotherCellClass} ${cellClass}`);
  });
});
