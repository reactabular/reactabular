/* eslint-disable react/prop-types */
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import { Table } from '../../src';

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
      <Table.Provider columns={columns} data={data} rowKey="id">
        <Table.Body />
      </Table.Provider>
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
      <Table.Provider columns={columns} data={data} rowKey="id">
        <Table.Body />
      </Table.Provider>
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
      <Table.Provider columns={columns} data={data} rowKey="id">
        <Table.Body />
      </Table.Provider>
    );
    const tds = TestUtils.scryRenderedDOMComponentsWithTag(table, 'td');

    expect(tds.length).to.equal(columns.length);
    expect(tds[0].children[0].className).to.equal('complex');
  });


  it('can be transformed', function () {
    const cellClass = 'test-class';
    const columns = [
      {
        header: {
          label: 'Name'
        },
        cell: {
          property: 'name',
          transforms: [
            () => ({
              className: cellClass
            })
          ]
        }
      }
    ];
    const table = TestUtils.renderIntoDocument(
      <Table.Provider columns={columns} data={[{ name: 'demo' }]} rowKey="name">
        <Table.Body />
      </Table.Provider>
    );
    const td = TestUtils.findRenderedDOMComponentWithClass(
      table, cellClass
    );

    expect(td).to.exist;
  });

  it('can be transformed with multiple transforms', function () {
    const cellClass = 'test-class';
    const style = { display: 'none' };
    const columns = [
      {
        header: {
          label: 'Name'
        },
        cell: {
          property: 'name',
          transforms: [
            () => ({
              className: cellClass
            }),
            () => ({
              style
            })
          ]
        }
      }
    ];
    const table = TestUtils.renderIntoDocument(
      <Table.Provider columns={columns} data={[{ name: 'demo' }]} rowKey="name">
        <Table.Body />
      </Table.Provider>
    );
    const td = TestUtils.findRenderedDOMComponentWithClass(
      table, cellClass
    );

    expect(td).to.exist;
    expect(td.className).to.equal(cellClass);
    expect(td.style.display).to.equal(style.display);
  });

  it('can be transformed with multiple transforms', function () {
    const cellClass = 'test-class';
    const anotherCellClass = 'another-test-class';
    const columns = [
      {
        header: {
          label: 'Name'
        },
        cell: {
          property: 'name',
          transforms: [
            () => ({
              className: cellClass
            }),
            () => ({
              className: anotherCellClass
            })
          ]
        }
      }
    ];
    const table = TestUtils.renderIntoDocument(
      <Table.Provider columns={columns} data={[{ name: 'demo' }]} rowKey="name">
        <Table.Body />
      </Table.Provider>
    );
    const td = TestUtils.findRenderedDOMComponentWithClass(
      table, cellClass
    );

    expect(td).to.exist;
    expect(td.className).to.equal(`${anotherCellClass} ${cellClass}`);
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
          transforms: [
            () => ({
              className: cellClass
            })
          ]
        }
      }
    ];
    const table = TestUtils.renderIntoDocument(
      <Table.Provider columns={columns} data={[{ name: 'demo' }]} rowKey="name">
        <Table.Body className={anotherCellClass} />
      </Table.Provider>
    );
    const td = TestUtils.findRenderedDOMComponentWithClass(
      table, cellClass
    );

    expect(td.className).to.equal(`${anotherCellClass} ${cellClass}`);
  });

  it('does retain objects with multiple transforms', function () {
    const cellClass = 'test-cell';
    const cellStyle = { color: 'blue' };
    const anotherCellStyle = { color: 'red', display: 'none' };
    const columns = [
      {
        header: {
          label: 'Name'
        },
        cell: {
          property: 'name',
          transforms: [
            () => ({
              className: cellClass,
              style: cellStyle
            }),
            () => ({
              style: anotherCellStyle
            })
          ]
        }
      }
    ];
    const table = TestUtils.renderIntoDocument(
      <Table.Provider columns={columns} data={[{ name: 'demo' }]} rowKey="name">
        <Table.Body />
      </Table.Provider>
    );
    const th = TestUtils.findRenderedDOMComponentWithClass(
      table, cellClass
    );

    expect(th).to.exist;
    expect(th.style.display).to.equal(anotherCellStyle.display);
    expect(th.style.color).to.equal(cellStyle.color);
  });
});
