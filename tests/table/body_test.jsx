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

  it('supports root props', function () {
    const cellClass = 'test-cell';
    const columns = [
      {
        props: {
          className: cellClass
        },
        header: {
          label: 'Age'
        },
        cell: {
          property: 'age'
        }
      }
    ];
    const data = [
      { position: 'foo', age: 111, name: 'foo', id: 0 }
    ];
    const table = TestUtils.renderIntoDocument(
      <Table.Provider columns={columns} data={data} rowKey="id">
        <Table.Body />
      </Table.Provider>
    );
    const td = TestUtils.findRenderedDOMComponentWithClass(
      table, cellClass
    );

    expect(td).to.exist;
  });

  it('supports cell props', function () {
    const cellClass = 'test-cell';
    const columns = [
      {
        header: {
          label: 'Age'
        },
        cell: {
          property: 'age',
          props: {
            className: cellClass
          }
        }
      }
    ];
    const data = [
      { position: 'foo', age: 111, name: 'foo', id: 0 }
    ];
    const table = TestUtils.renderIntoDocument(
      <Table.Provider columns={columns} data={data} rowKey="id">
        <Table.Body />
      </Table.Provider>
    );
    const td = TestUtils.findRenderedDOMComponentWithClass(
      table, cellClass
    );

    expect(td).to.exist;
  });

  it('merges props', function () {
    const cellClass = 'test-cell';
    const color = 'red';
    const backgroundColor = 'green';
    const columns = [
      {
        props: {
          style: {
            color
          }
        },
        header: {
          label: 'Age'
        },
        cell: {
          property: 'age',
          props: {
            className: cellClass,
            style: {
              backgroundColor
            }
          }
        }
      }
    ];
    const data = [
      { position: 'foo', age: 111, name: 'foo', id: 0 }
    ];
    const table = TestUtils.renderIntoDocument(
      <Table.Provider columns={columns} data={data} rowKey="id">
        <Table.Body />
      </Table.Provider>
    );
    const td = TestUtils.findRenderedDOMComponentWithClass(
      table, cellClass
    );

    expect(td.style.color).to.equal(color);
    expect(td.style.backgroundColor).to.equal(backgroundColor);
  });

  it('overrides classNames of props', function () {
    const cellClass = 'test-cell';
    const anotherCellClass = 'another-test-cell';
    const columns = [
      {
        props: {
          className: anotherCellClass
        },
        header: {
          label: 'Age'
        },
        cell: {
          property: 'age',
          props: {
            className: cellClass
          }
        }
      }
    ];
    const data = [
      { position: 'foo', age: 111, name: 'foo', id: 0 }
    ];
    const table = TestUtils.renderIntoDocument(
      <Table.Provider columns={columns} data={data} rowKey="id">
        <Table.Body />
      </Table.Provider>
    );
    const td = TestUtils.findRenderedDOMComponentWithClass(
      table, cellClass
    );

    expect(td.className).to.equal(`${cellClass} ${anotherCellClass}`);
  });

  it('resolves data', function () {
    const lastName = 'foobar';
    const columns = [
      {
        header: {
          label: 'Last name'
        },
        cell: {
          property: 'name',
          resolve: name => name.last
        }
      }
    ];
    const data = [
      { name: { last: lastName } }
    ];
    const table = TestUtils.renderIntoDocument(
      <Table.Provider columns={columns} data={data} rowKey="id">
        <Table.Body />
      </Table.Provider>
    );
    const td = TestUtils.findRenderedDOMComponentWithTag(
      table, 'td'
    );

    expect(td.innerHTML).to.equal(lastName);
  });

  it('works with dot notation', function () {
    const lastName = 'foobar';
    const columns = [
      {
        header: {
          label: 'Last name'
        },
        cell: {
          property: 'name.last'
        }
      }
    ];
    const data = [
      { name: { last: lastName } }
    ];
    const table = TestUtils.renderIntoDocument(
      <Table.Provider columns={columns} data={data} rowKey="id">
        <Table.Body />
      </Table.Provider>
    );
    const td = TestUtils.findRenderedDOMComponentWithTag(
      table, 'td'
    );

    expect(td.innerHTML).to.equal(lastName);
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

  it(`accepts columnIndex, column, rowData, rowIndex and property
    when transforming`, function () {
    const initialValue = 'demo';
    const initialProperty = 'name';
    let receivedLabel;
    let receivedValues;
    const columns = [
      {
        header: {
          label: 'Name'
        },
        cell: {
          property: initialProperty,
          transforms: [
            (label, extraValues) => {
              receivedLabel = label;
              receivedValues = extraValues;
            }
          ]
        }
      }
    ];
    const data = [
      {
        id: 0,
        name: initialValue
      }
    ];

    TestUtils.renderIntoDocument(
      <Table.Provider columns={columns} data={data} rowKey="id">
        <Table.Body />
      </Table.Provider>
    );

    expect(receivedLabel).to.equal(initialValue);
    expect(receivedValues).to.exist;
    expect(receivedValues.columnIndex).to.equal(0);
    expect(receivedValues.column.header).to.deep.equal(columns[0].header);
    expect(receivedValues.column.cell).to.deep.equal(columns[0].cell);
    expect(receivedValues.rowIndex).to.equal(0);
    expect(receivedValues.rowData).to.deep.equal(data[0]);
    expect(receivedValues.property).to.equal(initialProperty);
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

  [
    {
      type: 'wrapper',
      element: 'tbody'
    },
    {
      type: 'row',
      element: 'tr'
    },
    {
      type: 'cell',
      element: 'td'
    }
  ].forEach(({ type, element }) => {
    it(`allows table ${type} to be overridden`, function () {
      const wrapperClass = 'wrapper';
      const wrapper = ({ children }) => (
        React.createElement(
          element, {
            className: wrapperClass
          },
          children
        )
      );
      const components = {
        body: {}
      };
      components.body[type] = wrapper;

      const columns = [
        {
          header: {
            label: 'Demo'
          },
          cell: {
            property: 'name'
          }
        }
      ];
      const data = [
        {
          name: 'Demo'
        }
      ];
      const table = TestUtils.renderIntoDocument(
        <Table.Provider components={components} columns={columns} data={data} rowKey="name">
          <Table.Body />
        </Table.Provider>
      );
      const div = TestUtils.findRenderedDOMComponentWithClass(
        table, wrapperClass
      );

      expect(div).to.exist;
    });
  });

  it('supports custom props', function () {
    const customClass = 'demo';

    const table = TestUtils.renderIntoDocument(
      <Table.Provider columns={[]} data={[]}>
        <Table.Body className={customClass} />
      </Table.Provider>
    );
    const renderedTable = TestUtils.findRenderedDOMComponentWithClass(
      table, customClass
    );

    expect(renderedTable).to.exist;
  });
});
