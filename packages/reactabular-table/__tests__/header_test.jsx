/* eslint-disable react/prop-types */
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import * as Table from '../src';

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
      <Table.Provider columns={columns}>
        <Table.Header />
      </Table.Provider>
    );
    const th = TestUtils.findRenderedDOMComponentWithClass(
      table, headerClass
    );

    expect(th).toBeDefined();
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
      <Table.Provider columns={columns}>
        <Table.Header />
      </Table.Provider>
    );
    const th = TestUtils.findRenderedDOMComponentWithClass(
      table, headerClass
    );

    expect(th).toBeDefined();
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
      <Table.Provider columns={columns}>
        <Table.Header />
      </Table.Provider>
    );
    const th = TestUtils.findRenderedDOMComponentWithClass(
      table, headerClass
    );

    expect(th).toBeDefined();
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
      <Table.Provider columns={columns}>
        <Table.Header />
      </Table.Provider>
    );
    const th = TestUtils.findRenderedDOMComponentWithClass(
      table, headerClass
    );

    expect(th.style.color).toEqual(color);
    expect(th.style.backgroundColor).toEqual(backgroundColor);
  });

  it('merges classNames of props', function () {
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
      <Table.Provider columns={columns}>
        <Table.Header />
      </Table.Provider>
    );
    const th = TestUtils.findRenderedDOMComponentWithClass(
      table, headerClass
    );

    expect(th.className).toEqual(`${anotherClass} ${headerClass}`);
  });

  it('overrides styles in the right order', function () {
    const headerClass = 'test-header';
    const finalColor = 'red';
    const finalBackgroundColor = 'green';
    const finalDisplay = 'none';
    const columns = [
      {
        props: {
          style: {
            backgroundColor: 'black',
            color: finalColor,
            display: 'none'
          }
        },
        header: {
          label: 'Name',
          props: {
            className: headerClass,
            style: {
              backgroundColor: 'red',
              display: finalDisplay
            }
          },
          transforms: [
            () => ({
              style: {
                backgroundColor: 'orange'
              }
            }),
            () => ({
              style: {
                backgroundColor: finalBackgroundColor
              }
            })
          ]
        }
      }
    ];
    const table = TestUtils.renderIntoDocument(
      <Table.Provider columns={columns}>
        <Table.Header />
      </Table.Provider>
    );
    const th = TestUtils.findRenderedDOMComponentWithClass(
      table, headerClass
    );

    expect(th.style.color).toEqual(finalColor);
    expect(th.style.backgroundColor).toEqual(finalBackgroundColor);
    expect(th.style.display).toEqual(finalDisplay);
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
      <Table.Provider columns={columns}>
        <Table.Header>
          <tr className={testClass}>
            <td>demo</td>
          </tr>
        </Table.Header>
      </Table.Provider>
    );
    const testElement = TestUtils.findRenderedDOMComponentWithClass(
      table, testClass
    );

    expect(testElement).toBeDefined();
  });

  it('renders based on `header` fields', function () {
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
    const table = TestUtils.renderIntoDocument(
      <Table.Provider columns={columns}>
        <Table.Header />
      </Table.Provider>
    );
    const ths = TestUtils.scryRenderedDOMComponentsWithTag(
      table, 'th'
    );

    expect(ths.length).toEqual(columns.length);
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
      <Table.Provider columns={columns}>
        <Table.Header />
      </Table.Provider>
    );
    const th = TestUtils.findRenderedDOMComponentWithClass(
      table, headerClass
    );

    expect(th).toBeDefined();
  });

  it('accepts columnIndex and column when transforming', function () {
    const initialLabel = 'Name';
    let receivedLabel;
    let receivedValues;
    const columns = [
      {
        header: {
          label: initialLabel,
          property: initialLabel,
          transforms: [
            (label, extraValues) => {
              receivedLabel = label;
              receivedValues = extraValues;
            }
          ]
        }
      }
    ];

    TestUtils.renderIntoDocument(
      <Table.Provider columns={columns}>
        <Table.Header />
      </Table.Provider>
    );

    expect(receivedLabel).toEqual(initialLabel);
    expect(receivedValues).toBeDefined();
    expect(receivedValues.property).toEqual(initialLabel);
    expect(receivedValues.column).toEqual({
      ...columns[0]
    });
  });

  it('passes column level property', function () {
    const initialLabel = 'Name';
    let receivedLabel;
    let receivedValues;
    const columns = [
      {
        property: initialLabel,
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

    TestUtils.renderIntoDocument(
      <Table.Provider columns={columns}>
        <Table.Header />
      </Table.Provider>
    );

    expect(receivedLabel).toEqual(initialLabel);
    expect(receivedValues).toBeDefined();
    expect(receivedValues.property).toEqual(initialLabel);
    expect(receivedValues.column).toEqual({
      header: columns[0].header,
      property: initialLabel
    });
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
      <Table.Provider columns={columns}>
        <Table.Header />
      </Table.Provider>
    );
    const th = TestUtils.findRenderedDOMComponentWithClass(
      table, headerClass
    );

    expect(th).toBeDefined();
    expect(th.className).toEqual(headerClass);
    expect(th.style.display).toEqual(style.display);
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
      <Table.Provider columns={columns}>
        <Table.Header />
      </Table.Provider>
    );
    const th = TestUtils.findRenderedDOMComponentWithClass(
      table, headerClass
    );

    expect(th).toBeDefined();
    expect(th.className).toEqual(`${headerClass} ${anotherHeaderClass}`);
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
      <Table.Provider columns={columns}>
        <Table.Header />
      </Table.Provider>
    );
    const th = TestUtils.findRenderedDOMComponentWithClass(
      table, headerClass
    );

    expect(th).toBeDefined();
    expect(th.style.display).toEqual(anotherHeaderStyle.display);
    expect(th.style.color).toEqual(anotherHeaderStyle.color);
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
      <Table.Provider columns={columns}>
        <Table.Header className={anotherHeaderClass} />
      </Table.Provider>
    );
    const th = TestUtils.findRenderedDOMComponentWithClass(
      table, headerClass
    );

    expect(th.innerHTML).toEqual(label);
    expect(th.className).toEqual(`${headerClass} ${anotherHeaderClass}`);
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
        <Table.Provider components={components} columns={columns}>
          <Table.Header />
        </Table.Provider>
      );
      const div = TestUtils.findRenderedDOMComponentWithClass(
        table, wrapperClass
      );

      expect(div).toBeDefined();
    });
  });

  it('supports custom props', function () {
    const customClass = 'demo';

    const table = TestUtils.renderIntoDocument(
      <Table.Provider columns={[]}>
        <Table.Header className={customClass} />
      </Table.Provider>
    );
    const renderedTable = TestUtils.findRenderedDOMComponentWithClass(
      table, customClass
    );

    expect(renderedTable).toBeDefined();
  });

  it('gives access to header ref through getRef', function () {
    let ref;

    TestUtils.renderIntoDocument(
      <Table.Provider columns={[]}>
        <Table.Header
          ref={(r) => {
            ref = r;
          }}
        />
      </Table.Provider>
    );

    expect(ref).toBeDefined();
  });
});
