The following example implements a formatter that provides handles for altering column widths.

Note that the current implementation doesn't constrain the total width of the table. That would require additional logic as you would have to check for this while altering a column width.

```jsx
/*
import React from 'react';
import { Table } from 'reactabular';
import uuid from 'uuid';
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

    // Generate a unique id for the instance so we
    // don't get clashing class names for resizing.
    this.id = uuid.v4();

    this.state = {
      columns: this.getColumns(),
      data
    };

    this.tableHeader = null;
    this.tableBody = null;
  }
  componentDidMount() {
    // Create a custom stylesheet for tracking styles.
    // Without creating a custom one we would need to modify
    // an existing one.
    //
    // This can fail on old IE due to low maximum stylesheet limit.
    const { styleSheetElement, styleSheet } = this.createStyleSheet();

    this.styleSheetElement = styleSheetElement;
    this.styleSheet = styleSheet;

    // Patch the column definition with class names.
    this.setState({
      columns: this.initializeStyle(this.state.columns)
    });
  }
  componentWillUnmount() {
    document.removeChild(this.styleSheetElement);
  }
  initializeStyle(columns) {
    return columns.map((column, i) => {
      const className = this.getClassName(column, i);

      this.updateWidth(this.styleSheet, className, column.width);

      return {
        props: {
          className
        },
        ...column
      };
    });
  }
  getColumns() {
    const resizable = resizableColumn({
      onDrag: (width, { columnIndex }) => {
        const columns = this.state.columns;
        const column = columns[columnIndex];

        // Update the width of the changed column class
        const className = this.getClassName(column, columnIndex);
        this.updateWidth(this.styleSheet, className, width);
      }
    });

    return [
      {
        header: {
          label: 'Name',
          format: resizable
        },
        cell: {
          property: 'name'
        },
        // Track style on CSS level (not React)
        width: 200
      },
      {
        header: {
          label: 'Really Long Address Header',
          format: resizable
        },
        cell: {
          property: 'address'
        },
        width: 400
      },
      {
        header: {
          label: 'Age'
        },
        cell: {
          property: 'age'
        },
        width: 200
      }
    ];
  }
  createStyleSheet() {
    const styleSheetElement = document.createElement('style');
    styleSheetElement.type = 'text/css';
    document.head.appendChild(styleSheetElement);

    const styleSheets = document.styleSheets;

    return {
      styleSheetElement,
      // Return the newly created stylesheet. We can assume it's the last.
      styleSheet: styleSheets[styleSheets.length - 1]
    };
  }
  getClassName(column, i) {
    return `column-${this.id}-${i}`;
  }
  updateWidth(styleSheet, className, width) {
    const existingRule = this.findExistingRule(styleSheet, className);

    if (existingRule) {
      existingRule.style.width = width + 'px';
      existingRule.style.minWidth = width + 'px';
    }
    else {
      // https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet/insertRule
      // Insert to the top
      styleSheet.insertRule(
        `
        .${className} {
          width: ${width}px;
          minWidth: ${width}px;
        }
        `,
        0
      );
    }
  }
  findExistingRule(styleSheet, className) {
    // http://stackoverflow.com/a/566445/228885
    const cssRuleCode = document.all ? 'rules' : 'cssRules'; // IE, FF
    const cssRules = styleSheet[cssRuleCode];
    let i, cssRule;

    for (i = 0; i < cssRules.length; i++) {
      cssRule = cssRules[i];

      if (cssRule.selectorText === `.${className}`) {
        return cssRule;
      }
    }

    return null;
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
