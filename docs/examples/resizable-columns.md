The following example implements a formatter that provides handles for altering column widths.

Note that the current implementation doesn't constrain the total width of the table. That would require additional logic as you would have to check for this while altering a column width.

```jsx
/*
import React from 'react';
import { Table } from 'reactabular';
import { generateData, resizableColumn, Sticky } from './helpers';
*/

const schema = {
  type: 'object',
  properties: {
    id: {
      type: 'string'
    },
    name: {
      type: 'string'
    },
    address: {
      type: 'string'
    },
    age: {
      type: 'integer'
    }
  },
  required: ['id', 'name', 'age']
};
const data = generateData(100, schema);

class ResizableColumnsTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: this.getColumns(),
      data
    };

    this.tableHeader = null;
    this.tableBody = null;
  }
  getColumns() {
    const resizable = resizableColumn({
      getWidth: column => column.header.props.style.width,
      onDrag: (width, { columnIndex }) => {
        const columns = this.state.columns;
        const column = columns[columnIndex];

        column.header.props.style = {
          ...column.header.props.style,
          width,
          minWidth: width
        };

        this.setState({ columns });

        // Update the width of the changed column class
        const className = this.getClassName(column, columnIndex);
        this.updateStyle(className, column.header.props.style);
      }
    });

    return this.initializeStyle([
      {
        header: {
          label: 'Name',
          format: resizable,
          props: {
            style: {
              minWidth: 200,
              width: 200
            }
          }
        },
        cell: {
          property: 'name'
        }
      },
      {
        header: {
          label: 'Really Long Address Header',
          format: resizable,
          props: {
            style: {
              minWidth: 400,
              width: 400
            }
          }
        },
        cell: {
          property: 'address'
        }
      },
      {
        header: {
          label: 'Age',
          props: {
            style: {
              minWidth: 200,
              width: 200
            }
          }
        },
        cell: {
          property: 'age'
        }
      }
    ]);
  }
  initializeStyle(columns) {
    return columns.map((column, i) => {
      const className = this.getClassName(column, i);

      this.updateStyle(className, column.header.props.style);

      return {
        props: {
          className
        },
        ...column
      };
    });
  }
  getClassName(column, i) {
    return `column-${i}`;
  }
  updateStyle(className, style) {
    // TODO: generalize
    // http://stackoverflow.com/a/566445/228885
    // This attaches the style to the first found stylesheet
    const cssRuleCode = document.all ? 'rules' : 'cssRules'; // IE, FF
    const styleSheet = document.styleSheets[0];

    // XXXXX: this fails if you have multiple rules - there should be index -> rule map
    // Set up a custom script tag for custom style and handle indexing there?
    const existingRule = styleSheet[cssRuleCode][0];
    const ruleText = `
      .${className} {
        width: ${style.width}px;
        minWidth: ${style.minWidth}px;
      }
    `;

    if (existingRule.selectorText === `.${className}`) {
      existingRule.style.width = style.width + 'px';
      existingRule.style.minWidth = style.minWidth + 'px';
    }
    else {
      // https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet/insertRule
      // Insert to the top
      styleSheet.insertRule(ruleText, 0);
    }
  }
  render() {
    const { data, columns } = this.state;

    return (
      <Table.Provider
        className="pure-table pure-table-striped"
        columns={columns}
        data={data}
        rowKey="id"
        style={{ width: 'auto' }}
      >
        <Sticky.Header
          style={{
            maxWidth: 800
          }}
          ref={tableHeader => {
            if (tableHeader) {
              this.tableHeader = ReactDOM.findDOMNode(tableHeader);
            }
          }}
          onScroll={scrollLeft => (
            this.tableBody.scrollLeft = scrollLeft
          )}
        />

        <Sticky.Body
          style={{
            maxWidth: 800,
            maxHeight: 400
          }}
          ref={tableBody => {
            if (tableBody) {
              this.tableBody = ReactDOM.findDOMNode(tableBody);
            }
          }}
          onScroll={scrollLeft => (
            this.tableHeader.scrollLeft = scrollLeft
          )}
          row={this.onRow}
        />
      </Table.Provider>
    );
  }
  onRow(row, rowIndex) {
    return {
      className: rowIndex % 2 ? 'odd-row' : 'even-row',
    };
  }
}

<ResizableColumnsTable />
```
