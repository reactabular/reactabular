/* eslint-disable react/prop-types */
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import { Table } from '../../src';

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
      <Table.Provider columns={columns} data={[]}>
        <Table.Header />
      </Table.Provider>
    );
    const th = TestUtils.findRenderedDOMComponentWithClass(
      table, headerClass
    );

    expect(th).to.exist;
  });

  it('supports root props', function () {
    const headerClass = 'test-header';
    const columns = [
      {
        props: {
          className: headerClass
        },
        header: {
          label: 'Name'
        }
      }
    ];
    const table = TestUtils.renderIntoDocument(
      <Table.Provider columns={columns} data={[]}>
        <Table.Header />
      </Table.Provider>
    );
    const th = TestUtils.findRenderedDOMComponentWithClass(
      table, headerClass
    );

    expect(th).to.exist;
  });

  it('supports header props', function () {
    const headerClass = 'test-header';
    const columns = [
      {
        header: {
          label: 'Name',
          props: {
            className: headerClass
          }
        }
      }
    ];
    const table = TestUtils.renderIntoDocument(
      <Table.Provider columns={columns} data={[]}>
        <Table.Header />
      </Table.Provider>
    );
    const th = TestUtils.findRenderedDOMComponentWithClass(
      table, headerClass
    );

    expect(th).to.exist;
  });

  it('merges props', function () {
    const headerClass = 'test-header';
    const color = 'red';
    const backgroundColor = 'green';
    const columns = [
      {
        props: {
          className: headerClass,
          style: {
            color
          }
        },
        header: {
          label: 'Name',
          props: {
            style: {
              backgroundColor
            }
          }
        }
      }
    ];
    const table = TestUtils.renderIntoDocument(
      <Table.Provider columns={columns} data={[]}>
        <Table.Header />
      </Table.Provider>
    );
    const th = TestUtils.findRenderedDOMComponentWithClass(
      table, headerClass
    );

    expect(th.style.color).to.equal(color);
    expect(th.style.backgroundColor).to.equal(backgroundColor);
  });

  it('overrides classNames of props', function () {
    const headerClass = 'test-header';
    const anotherClass = 'another-class';
    const columns = [
      {
        props: {
          className: anotherClass
        },
        header: {
          label: 'Name',
          props: {
            className: headerClass
          }
        }
      }
    ];
    const table = TestUtils.renderIntoDocument(
      <Table.Provider columns={columns} data={[]}>
        <Table.Header />
      </Table.Provider>
    );
    const th = TestUtils.findRenderedDOMComponentWithClass(
      table, headerClass
    );

    expect(th.className).to.equal(`${headerClass} ${anotherClass}`);
  });

  it('renders children', function () {
    const testClass = 'test-header';
    const columns = [
      {
        header: {
          label: 'Name'
        }
      }
    ];
    const table = TestUtils.renderIntoDocument(
      <Table.Provider columns={columns} data={[]}>
        <Table.Header>
          <tr className={testClass}>demo</tr>
        </Table.Header>
      </Table.Provider>
    );
    const testElement = TestUtils.findRenderedDOMComponentWithClass(
      table, testClass
    );

    expect(testElement).to.exist;
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
      <Table.Provider columns={columns} data={[]}>
        <Table.Header />
      </Table.Provider>
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
          transforms: [
            () => ({
              className: headerClass
            })
          ]
        }
      }
    ];
    const table = TestUtils.renderIntoDocument(
      <Table.Provider columns={columns} data={[]}>
        <Table.Header />
      </Table.Provider>
    );
    const th = TestUtils.findRenderedDOMComponentWithClass(
      table, headerClass
    );

    expect(th).to.exist;
  });

  it('accepts columnIndex, column, and rowData when transforming', function () {
    const initialLabel = 'Name';
    let receivedLabel;
    let receivedValues;
    const columns = [
      {
        header: {
          label: initialLabel,
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
        name: 'demo'
      }
    ];

    TestUtils.renderIntoDocument(
      <Table.Provider columns={columns} data={data} rowKey="id">
        <Table.Header />
      </Table.Provider>
    );

    expect(receivedLabel).to.equal(initialLabel);
    expect(receivedValues).to.exist;
    expect(receivedValues.columnIndex).to.equal(0);
    expect(receivedValues.column.header).to.deep.equal(columns[0].header);
    expect(receivedValues.rowData).to.deep.equal(initialLabel);
  });

  it('can be transformed with multiple transforms', function () {
    const headerClass = 'test-header';
    const style = { display: 'none' };
    const columns = [
      {
        header: {
          label: 'Name',
          transforms: [
            () => ({
              className: headerClass
            }),
            () => ({
              style
            })
          ]
        }
      }
    ];
    const table = TestUtils.renderIntoDocument(
      <Table.Provider columns={columns} data={[]}>
        <Table.Header />
      </Table.Provider>
    );
    const th = TestUtils.findRenderedDOMComponentWithClass(
      table, headerClass
    );

    expect(th).to.exist;
    expect(th.className).to.equal(headerClass);
    expect(th.style.display).to.equal(style.display);
  });

  it('retains classNames with multiple transforms', function () {
    const headerClass = 'test-header';
    const anotherHeaderClass = 'another-test-header';
    const columns = [
      {
        header: {
          label: 'Name',
          transforms: [
            () => ({
              className: headerClass
            }),
            () => ({
              className: anotherHeaderClass
            })
          ]
        }
      }
    ];
    const table = TestUtils.renderIntoDocument(
      <Table.Provider columns={columns} data={[]}>
        <Table.Header />
      </Table.Provider>
    );
    const th = TestUtils.findRenderedDOMComponentWithClass(
      table, headerClass
    );

    expect(th).to.exist;
    expect(th.className).to.equal(`${headerClass} ${anotherHeaderClass}`);
  });

  it('does retain objects with multiple transforms', function () {
    const headerClass = 'test-header';
    const headerStyle = { color: 'blue' };
    const anotherHeaderStyle = { color: 'red', display: 'none' };
    const columns = [
      {
        header: {
          label: 'Name',
          transforms: [
            () => ({
              className: headerClass,
              style: headerStyle
            }),
            () => ({
              style: anotherHeaderStyle
            })
          ]
        }
      }
    ];
    const table = TestUtils.renderIntoDocument(
      <Table.Provider columns={columns} data={[]}>
        <Table.Header />
      </Table.Provider>
    );
    const th = TestUtils.findRenderedDOMComponentWithClass(
      table, headerClass
    );

    expect(th).to.exist;
    expect(th.style.display).to.equal(anotherHeaderStyle.display);
    expect(th.style.color).to.equal(headerStyle.color);
  });

  it('can be transformed while retaining classNames', function () {
    const headerClass = 'test-header';
    const anotherHeaderClass = 'another-header';
    const label = 'Name';
    const columns = [
      {
        header: {
          label,
          transforms: [
            () => ({
              className: headerClass
            }),
            () => ({
              className: anotherHeaderClass
            })
          ]
        }
      }
    ];
    const table = TestUtils.renderIntoDocument(
      <Table.Provider columns={columns} data={[]}>
        <Table.Header className={anotherHeaderClass} />
      </Table.Provider>
    );
    const th = TestUtils.findRenderedDOMComponentWithClass(
      table, headerClass
    );

    expect(th.innerHTML).to.equal(label);
    expect(th.className).to.equal(`${headerClass} ${anotherHeaderClass}`);
  });

  [
    {
      type: 'wrapper',
      element: 'thead'
    },
    {
      type: 'row',
      element: 'tr'
    },
    {
      type: 'cell',
      element: 'th'
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
        header: {}
      };
      components.header[type] = wrapper;

      const columns = [
        {
          header: {
            label: 'Demo'
          }
        }
      ];
      const table = TestUtils.renderIntoDocument(
        <Table.Provider components={components} columns={columns} data={[]}>
          <Table.Header />
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
        <Table.Header className={customClass} />
      </Table.Provider>
    );
    const renderedTable = TestUtils.findRenderedDOMComponentWithClass(
      table, customClass
    );

    expect(renderedTable).to.exist;
  });
});
