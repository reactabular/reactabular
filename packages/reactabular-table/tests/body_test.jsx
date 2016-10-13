/* eslint-disable react/prop-types */
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import * as Table from '../src';
import * as edit from '../../react-edit/src';
import * as resolve from '../../reactabular-resolve/src';

describe('Table.Body', function () {
  it('displays rows', function () {
    const columns = [
      {
        property: 'name',
        header: {
          label: 'Name'
        }
      },
      {
        property: 'position',
        header: {
          label: 'Position'
        }
      },
      {
        property: 'age',
        header: {
          label: 'Age'
        }
      }
    ];
    const rows = [
      { position: 'foo', age: 111, name: 'foo', id: 0 },
      { position: 'demo', age: 333, name: 'boo', id: 1 },
      { position: 'demo 2', age: 123, name: 'demo', id: 2 }
    ];
    const table = TestUtils.renderIntoDocument(
      <Table.Provider columns={columns}>
        <Table.Body rows={rows} rowKey="id" />
      </Table.Provider>
    );
    const trs = TestUtils.scryRenderedDOMComponentsWithTag(
      table, 'tr'
    );

    expect(trs.length).to.equal(rows.length);
  });

  it('supports root props', function () {
    const cellClass = 'test-cell';
    const columns = [
      {
        property: 'age',
        props: {
          className: cellClass
        },
        header: {
          label: 'Age'
        }
      }
    ];
    const rows = [
      { position: 'foo', age: 111, name: 'foo', id: 0 }
    ];
    const table = TestUtils.renderIntoDocument(
      <Table.Provider columns={columns}>
        <Table.Body rows={rows} rowKey="id" />
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
        property: 'age',
        header: {
          label: 'Age'
        },
        cell: {
          props: {
            className: cellClass
          }
        }
      }
    ];
    const rows = [
      { position: 'foo', age: 111, name: 'foo', id: 0 }
    ];
    const table = TestUtils.renderIntoDocument(
      <Table.Provider columns={columns}>
        <Table.Body rows={rows} rowKey="id" />
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
        property: 'age',
        props: {
          style: {
            color
          }
        },
        header: {
          label: 'Age'
        },
        cell: {
          props: {
            className: cellClass,
            style: {
              backgroundColor
            }
          }
        }
      }
    ];
    const rows = [
      { position: 'foo', age: 111, name: 'foo', id: 0 }
    ];
    const table = TestUtils.renderIntoDocument(
      <Table.Provider columns={columns}>
        <Table.Body rows={rows} rowKey="id" />
      </Table.Provider>
    );
    const td = TestUtils.findRenderedDOMComponentWithClass(
      table, cellClass
    );

    expect(td.style.color).to.equal(color);
    expect(td.style.backgroundColor).to.equal(backgroundColor);
  });

  it('merges classNames of props', function () {
    const cellClass = 'test-cell';
    const anotherCellClass = 'another-test-cell';
    const columns = [
      {
        property: 'age',
        props: {
          className: anotherCellClass
        },
        header: {
          label: 'Age'
        },
        cell: {
          props: {
            className: cellClass
          }
        }
      }
    ];
    const rows = [
      { position: 'foo', age: 111, name: 'foo', id: 0 }
    ];
    const table = TestUtils.renderIntoDocument(
      <Table.Provider columns={columns}>
        <Table.Body rows={rows} rowKey="id" />
      </Table.Provider>
    );
    const td = TestUtils.findRenderedDOMComponentWithClass(
      table, cellClass
    );

    expect(td.className).to.equal(`${anotherCellClass} ${cellClass}`);
  });

  it('overrides styles in the right order', function () {
    const cellClass = 'test-header';
    const finalColor = 'red';
    const finalBackgroundColor = 'green';
    const finalDisplay = 'none';
    const columns = [
      {
        property: 'age',
        props: {
          style: {
            backgroundColor: 'black',
            color: 'yellow',
            display: finalDisplay
          }
        },
        header: {
          label: 'Name'
        },
        cell: {
          props: {
            className: cellClass,
            style: {
              backgroundColor: finalBackgroundColor,
              color: 'blue'
            }
          },
          transforms: [
            () => ({
              style: {
                color: 'purple'
              }
            }),
            () => ({
              style: {
                color: finalColor
              }
            })
          ]
        }
      }
    ];
    const rows = [
      { position: 'foo', age: 111, name: 'foo', id: 0 }
    ];
    const table = TestUtils.renderIntoDocument(
      <Table.Provider columns={columns}>
        <Table.Body rows={rows} rowKey="id" />
      </Table.Provider>
    );
    const td = TestUtils.findRenderedDOMComponentWithClass(
      table, cellClass
    );

    expect(td.style.color).to.equal(finalColor);
    expect(td.style.backgroundColor).to.equal(finalBackgroundColor);
    expect(td.style.display).to.equal(finalDisplay);
  });

  it('does not resolve rows by default', function () {
    const lastName = 'foobar';
    const columns = [
      {
        property: 'name.last',
        header: {
          label: 'Last name'
        }
      }
    ];
    const rows = [
      { name: { last: lastName }, id: 0 }
    ];
    const table = TestUtils.renderIntoDocument(
      <Table.Provider columns={columns}>
        <Table.Body rows={rows} rowKey="id" />
      </Table.Provider>
    );
    const td = TestUtils.findRenderedDOMComponentWithTag(
      table, 'td'
    );

    expect(td.innerHTML).to.equal('');
  });

  it('resolves rows if nested resolver is used', function () {
    const lastName = 'foobar';
    const columns = [
      {
        property: 'name.last',
        header: {
          label: 'Last name'
        }
      }
    ];
    const rows = [
      { name: { last: lastName }, id: 0 }
    ];
    const table = TestUtils.renderIntoDocument(
      <Table.Provider columns={columns}>
        <Table.Body
          rows={resolve.resolve({ columns, method: resolve.nested })(rows)}
          rowKey="id"
        />
      </Table.Provider>
    );
    const td = TestUtils.findRenderedDOMComponentWithTag(
      table, 'td'
    );

    expect(td.innerHTML).to.equal(lastName);
  });

  it('resolves rows if byFunction resolver is used', function () {
    const name = 'foobar';
    const columns = [
      {
        property: 'name',
        header: {
          label: 'Name'
        },
        cell: {
          resolve: v => v + v
        }
      }
    ];
    const rows = [
      { name, id: 0 }
    ];
    const table = TestUtils.renderIntoDocument(
      <Table.Provider columns={columns}>
        <Table.Body
          rows={resolve.resolve({
            columns,
            method: resolve.byFunction('cell.resolve')
          })(rows)}
          rowKey="id"
        />
      </Table.Provider>
    );
    const td = TestUtils.findRenderedDOMComponentWithTag(
      table, 'td'
    );

    expect(td.innerHTML).to.equal(name + name);
  });

  it('passes unresolved values to transforms', function () {
    let receivedValue;
    const name = 'foobar';
    const columns = [
      {
        property: 'name',
        header: {
          label: 'Name'
        },
        cell: {
          resolve: v => v + v,
          transforms: [
            (v) => {
              receivedValue = v;
            }
          ]
        }
      }
    ];
    const rows = [
      { name, id: 0 }
    ];
    TestUtils.renderIntoDocument(
      <Table.Provider columns={columns}>
        <Table.Body
          rows={resolve.resolve({
            columns,
            method: resolve.byFunction('cell.resolve')
          })(rows)}
          rowKey="id"
        />
      </Table.Provider>
    );

    expect(receivedValue).to.equal(name);
  });

  it('can be formatted', function () {
    const columns = [
      {
        property: 'basic',
        header: {
          label: 'Basic'
        }
      },
      {
        property: 'identity',
        header: {
          label: 'Identity'
        },
        cell: {
          format: value => value
        }
      },
      {
        property: 'math',
        header: {
          label: 'Simple Math'
        },
        cell: {
          format: value => value - 23
        }
      }
    ];
    const rows = [
      {
        basic: 'basic',
        identity: 'ident',
        math: 23, // deliberately chosen to make cell function return 0, a falsy value
        id: 0
      }
    ];
    const table = TestUtils.renderIntoDocument(
      <Table.Provider columns={columns}>
        <Table.Body rows={rows} rowKey="id" />
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
        property: 'complex',
        header: {
          label: 'Cell Props'
        },
        cell: {
          format: value => <span className="complex">{value}</span>
        }
      },
      {
        property: 'jsx',
        header: {
          label: 'JSX'
        },
        cell: {
          format: value => <a href={`http://${value.id}`}>{value.name}</a>
        }
      }
    ];
    const rows = [
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
      <Table.Provider columns={columns}>
        <Table.Body rows={rows} rowKey="id" />
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
        property: 'name',
        header: {
          label: 'Name'
        },
        cell: {
          transforms: [
            () => ({
              className: cellClass
            })
          ]
        }
      }
    ];
    const table = TestUtils.renderIntoDocument(
      <Table.Provider columns={columns}>
        <Table.Body rows={[{ name: 'demo' }]} rowKey="name" />
      </Table.Provider>
    );
    const td = TestUtils.findRenderedDOMComponentWithClass(
      table, cellClass
    );

    expect(td).to.exist;
  });

  it('can replace contents based on transform children', function () {
    const demoText = 'foobar';
    const cellClass = 'test-class';
    const columns = [
      {
        property: 'name',
        header: {
          label: 'Name'
        },
        cell: {
          transforms: [
            () => ({
              children: <div className={cellClass}>{demoText}</div>
            })
          ]
        }
      }
    ];
    const table = TestUtils.renderIntoDocument(
      <Table.Provider columns={columns}>
        <Table.Body rows={[{ name: 'demo' }]} rowKey="name" />
      </Table.Provider>
    );
    const td = TestUtils.findRenderedDOMComponentWithClass(
      table, cellClass
    );

    expect(td.innerHTML).to.equal(demoText);
  });

  it('can replace contents based on the first transform children', function () {
    const demoText = 'foobar';
    const cellClass = 'test-class';
    const columns = [
      {
        property: 'name',
        header: {
          label: 'Name'
        },
        cell: {
          transforms: [
            () => ({
              children: <div className={cellClass}>{demoText}</div>
            }),
            () => ({
              children: <div>another</div>
            })
          ]
        }
      }
    ];
    const table = TestUtils.renderIntoDocument(
      <Table.Provider columns={columns}>
        <Table.Body rows={[{ name: 'demo' }]} rowKey="name" />
      </Table.Provider>
    );
    const td = TestUtils.findRenderedDOMComponentWithClass(
      table, cellClass
    );

    expect(td.innerHTML).to.equal(demoText);
  });

  it(`accepts columnIndex, column, rowData, rowIndex and property
    when transforming`, function () {
    const initialValue = 'demo';
    const initialProperty = 'name';
    let receivedLabel;
    let receivedValues;
    const columns = [
      {
        property: initialProperty,
        header: {
          label: 'Name'
        },
        cell: {
          transforms: [
            (label, extraValues) => {
              receivedLabel = label;
              receivedValues = extraValues;
            }
          ]
        }
      }
    ];
    const rows = [
      {
        id: 0,
        name: initialValue
      }
    ];

    TestUtils.renderIntoDocument(
      <Table.Provider columns={columns}>
        <Table.Body rows={rows} rowKey="id" />
      </Table.Provider>
    );

    expect(receivedLabel).to.equal(initialValue);
    expect(receivedValues).to.exist;
    expect(receivedValues.columnIndex).to.equal(0);
    expect(receivedValues.column.header).to.deep.equal(columns[0].header);
    expect(receivedValues.column.cell).to.deep.equal(columns[0].cell);
    expect(receivedValues.rowIndex).to.equal(0);
    expect(receivedValues.rowData).to.deep.equal(rows[0]);
    expect(receivedValues.property).to.equal(initialProperty);
  });

  it('can be transformed with multiple transforms', function () {
    const cellClass = 'test-class';
    const style = { display: 'none' };
    const columns = [
      {
        property: 'name',
        header: {
          label: 'Name'
        },
        cell: {
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
      <Table.Provider columns={columns}>
        <Table.Body rows={[{ name: 'demo' }]} rowKey="name" />
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
        property: 'name',
        header: {
          label: 'Name'
        },
        cell: {
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
      <Table.Provider columns={columns}>
        <Table.Body rows={[{ name: 'demo' }]} rowKey="name" />
      </Table.Provider>
    );
    const td = TestUtils.findRenderedDOMComponentWithClass(
      table, cellClass
    );

    expect(td).to.exist;
    expect(td.className).to.equal(`${cellClass} ${anotherCellClass}`);
  });

  it('can be transformed while retaining classNames', function () {
    const cellClass = 'test-cell';
    const anotherCellClass = 'another-cell';
    const columns = [
      {
        property: 'name',
        header: {
          label: 'Name'
        },
        cell: {
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
      <Table.Provider columns={columns}>
        <Table.Body rows={[{ name: 'demo' }]} rowKey="name" />
      </Table.Provider>
    );
    const td = TestUtils.findRenderedDOMComponentWithClass(
      table, cellClass
    );

    expect(td.className).to.equal(`${cellClass} ${anotherCellClass}`);
  });

  it('retains objects with multiple transforms', function () {
    const cellClass = 'test-cell';
    const cellStyle = { color: 'blue' };
    const anotherCellStyle = { color: 'red', display: 'none' };
    const columns = [
      {
        property: 'name',
        header: {
          label: 'Name'
        },
        cell: {
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
      <Table.Provider columns={columns}>
        <Table.Body rows={[{ name: 'demo' }]} rowKey="name" />
      </Table.Provider>
    );
    const th = TestUtils.findRenderedDOMComponentWithClass(
      table, cellClass
    );

    expect(th).to.exist;
    expect(th.style.display).to.equal(anotherCellStyle.display);
    expect(th.style.color).to.equal(anotherCellStyle.color);
  });

  it('works with an edit transform', function () {
    const cellClass = 'test-cell';
    const editorClass = 'test-editor';
    let activated;

    const editor = edit.edit({
      isEditing() {
        return false;
      },
      onActivate() {
        activated = true;
      },
      onValue() {
        return activated;
      }
    });
    const columns = [
      {
        property: 'name',
        header: {
          label: 'Name'
        },
        cell: {
          transforms: [editor(edit.input({ className: editorClass }))],
          props: {
            className: cellClass
          }
        }
      }
    ];
    const table = TestUtils.renderIntoDocument(
      <Table.Provider columns={columns}>
        <Table.Body rows={[{ name: 'demo' }]} rowKey="name" />
      </Table.Provider>
    );
    const cellElement = TestUtils.findRenderedDOMComponentWithClass(
      table, cellClass
    );

    expect(cellElement).to.exist;

    TestUtils.Simulate.click(cellElement);

    expect(activated).to.be.true;

    /*
    XXX: DOM manipulation is async so this doesn't work
    http://stackoverflow.com/a/30477507/228885
    Figure out a better way to deal with this as this will fail.
    const editorElement = TestUtils.findRenderedDOMComponentWithClass(
      table, editorClass
    );

    expect(editorElement).to.exist;
    */
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
          property: 'name',
          header: {
            label: 'Demo'
          }
        }
      ];
      const rows = [
        {
          name: 'Demo'
        }
      ];
      const table = TestUtils.renderIntoDocument(
        <Table.Provider components={components} columns={columns}>
          <Table.Body rows={rows} rowKey="name" />
        </Table.Provider>
      );
      const div = TestUtils.findRenderedDOMComponentWithClass(
        table, wrapperClass
      );

      expect(div).to.exist;
    });
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
        property: 'name',
        header: {
          label: 'Name'
        }
      }
    ];
    const rows = [{ name: 'demo' }];

    const node = document.createElement('div');
    const component = ReactDOM.render( // eslint-disable-line react/no-render-return-value
      <Table.Provider
        columns={columns}
        components={{
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
        property: 'name',
        header: {
          label: 'Name'
        }
      }
    ];
    const rows = [{ name: 'demo' }];

    const node = document.createElement('div');
    const component = ReactDOM.render( // eslint-disable-line react/no-render-return-value
      <Table.Provider
        columns={columns}
        components={{
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

    const table = TestUtils.renderIntoDocument(
      <Table.Provider columns={[]}>
        <Table.Body className={customClass} rows={[]} />
      </Table.Provider>
    );
    const renderedTable = TestUtils.findRenderedDOMComponentWithClass(
      table, customClass
    );

    expect(renderedTable).to.exist;
  });

  it('gives access to body ref through getRef', function () {
    let ref;

    TestUtils.renderIntoDocument(
      <Table.Provider columns={[]}>
        <Table.Body
          rows={[]}
          ref={(r) => {
            ref = r;
          }}
        />
      </Table.Provider>
    );

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
        property: 'name',
        header: {
          label: 'Name'
        }
      }
    ];

    const table = TestUtils.renderIntoDocument(
      <Table.Provider columns={columns}>
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
      </Table.Provider>
    );
    const tr = TestUtils.findRenderedDOMComponentWithClass(
      table, rowClass
    );

    expect(receivedRow).to.deep.equal(testRow);
    expect(receivedRowIndex).to.equal(0);
    expect(receivedRowKey).to.equal(`${testRow.name}-row`);
    expect(tr).to.exist;
  });

  it('accepts a function for rowKey', function () {
    const cellClass = 'test-cell';
    const columns = [
      {
        property: 'age',
        props: {
          className: cellClass
        },
        header: {
          label: 'Age'
        }
      }
    ];
    const id = 0;
    const rows = [
      { position: 'foo', age: 111, name: 'foo', nested: { id } }
    ];
    const table = TestUtils.renderIntoDocument(
      <Table.Provider columns={columns}>
        <Table.Body rows={rows} rowKey={({ rowData }) => rowData.nested.id} />
      </Table.Provider>
    );
    const tableBodyRow = TestUtils.findRenderedComponentWithType(
      table, Table.BodyRow
    );
    // XXX: there's likely a lot better way to dig the key
    // Shallow rendering perhaps? https://github.com/facebook/react/issues/3721#issuecomment-106318499
    const key = tableBodyRow._reactInternalInstance._currentElement.key;

    expect(key).to.equal(`${id}-row`);
  });

  it('rowKey function received rowIndex', function () {
    const cellClass = 'test-cell';
    const columns = [
      {
        property: 'age',
        props: {
          className: cellClass
        },
        header: {
          label: 'Age'
        }
      }
    ];
    const index = 0;
    const rows = [
      { position: 'foo', age: 111, name: 'foo' }
    ];
    const table = TestUtils.renderIntoDocument(
      <Table.Provider columns={columns}>
        <Table.Body rows={rows} rowKey={({ rowIndex }) => rowIndex} />
      </Table.Provider>
    );
    const tableBodyRow = TestUtils.findRenderedComponentWithType(
      table, Table.BodyRow
    );
    // XXX: there's likely a lot better way to dig the key
    // Shallow rendering perhaps? https://github.com/facebook/react/issues/3721#issuecomment-106318499
    const key = tableBodyRow._reactInternalInstance._currentElement.key;

    expect(key).to.equal(`${index}-row`);
  });

  it('allows passing custom row keys through _index', function () {
    const testIndex = 13;
    const testRow = { name: 'demo', _index: testIndex };
    const columns = [
      {
        property: 'name',
        header: {
          label: 'Name'
        }
      }
    ];

    const table = TestUtils.renderIntoDocument(
      <Table.Provider columns={columns}>
        <Table.Body
          rows={[testRow]}
          rowKey="name"
          onRow={(row, { rowIndex }) => ({
            className: rowIndex
          })}
        />
      </Table.Provider>
    );
    const tr = TestUtils.findRenderedDOMComponentWithClass(
      table, testIndex.toString()
    );

    expect(tr).to.exist;
  });
});
