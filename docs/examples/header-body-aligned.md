When scrolling to the right end of a table with sticky header, header could be misaligned if the vertical scroll bar exists.

The solution is to create a independent horizontal scroll bar component outside of reactabular table.

Since the scroll bar is out of table, the vertical scroll bar in the table has not impact on horizontal scroll bar's `scrollLeft` and `scrollWidth`. So the headers and cells are always aligned.

Here we provide a native horizontal scroll bar inside table, and one external scroll bar created from component `HorizontalScrollBar`.

Please *drag both horizontal scroll bars to the right end* and see the difference.

```jsx
/*
import React from 'react';
import * as Virtualized from 'reactabular-virtualized';
import * as Table from 'reactabular-table';
import * as Sticky from 'reactabular-sticky';
*/
class HorizontalScrollBar extends React.PureComponent {
  render() {
    let { width, scrollWidth, left, top, ...props } = { ...this.props };
    left = left || 0;
    top = top || 0;

    let scrollbarOuterStyle = {
      display: 'inline-block',
      overflow: 'auto',
      backgroundColor: 'transparent',
      position: 'relative',
      width: width,
      height: 16,
      left: left,
      top: top
    };
    let scrollbarInnerStyle = {
      display: 'inline-block',
      width: scrollWidth,
      height: '100%'
    };

    return (
      <div style={ scrollbarOuterStyle } {...props} >
        <span
          style={ scrollbarInnerStyle }
        />
      </div>
    );
  }
}

function generateRandomTableData() {
  let tableData = {
    rows: [],
    columns: []
  };

  let columnNum = 50;
  let rowNum = 300;
  let width = 80;

  // filling rows
  for (let i = 0; i < rowNum; i++) {
    let tmpRow = {id: i}
    for (let j = 0; j < columnNum; j++) {
      tmpRow[`col${j}`] = Math.floor(Math.random() * 100) - 50;
    }
    tableData.rows.push(tmpRow)
  }

  // id column should always exist
  tableData.columns.push({
    property: 'id', // the json row need two levels
    props: {
      style: {
        minWidth: width
      }
    },
    header: {
      label: 'id'
    }
  });

  // filling columns
  for (let j = 0; j < columnNum; j++) {
    tableData.columns.push({
        property: `col${j}`, // the json row need two levels
        props: {
          style: {
            minWidth: width
          }
        },
        header: {
          label: `col${j}`
        }
      });
  }
  return tableData;
}


class MyTable extends React.Component {
  constructor(props) {
    super(props);
    this.onScrollFromThirdParty = this.onScrollFromThirdParty.bind(this);
    this.onScrollFromNative = this.onScrollFromNative.bind(this);
  }
  onScrollFromThirdParty(e) {
    console.log('onScrollFromThirdParty called => e.target.scrollLeft=', e.target.scrollLeft);
    this.tableHeader.scrollLeft = e.target.scrollLeft;
    this.tableBody.scrollLeft = e.target.scrollLeft; 
  }
  onScrollFromNative(e) {
    // just demo to reproduce issue of native horizontal scrollbar
    // We should not intercept the native onScroll event actually
    console.log('onScrollFromNative called => e.target.scrollLeft=', e.target.scrollLeft);
    this.tableHeader.scrollLeft = e.target.scrollLeft;
  }
  render(){
    let { columns, rows } = this.props;
    let totalColumnsWidth = 0;
    for(let i = 0; i < columns.length; i++) {
      totalColumnsWidth += columns[i].props.style.minWidth;
    }
    const tableWidth = 800;
    const tableHeight = 300;
    const tableStyle = {
      width: tableWidth,
      clear: 'none',
    };
    const tableHeaderStyle = {
      maxWidth: tableWidth,
      overflow:'hidden'
    };
    const tableBodyStyle = {
      maxWidth: tableWidth,
      maxHeight: tableHeight,
      overflow:'auto'
    };
    return (
      <div>
        <h4>Table with native horizontal scrollbar</h4>
        <Table.Provider
          className="pure-table pure-table-striped"
          columns={columns}
          style={tableStyle}
          components={{
            body: {
              wrapper: Virtualized.BodyWrapper,
              row: Virtualized.BodyRow
            }
          }}
        >
          <Sticky.Header
            style={tableHeaderStyle}
            ref={ r => this.tableHeader = r && r.getRef() }
            tableBody={ this.tableBody }
          />
          <Virtualized.Body
            rows={rows}
            rowKey="id"
            style={tableBodyStyle}
            ref={ r => this.tableBody = r && r.getRef() }
            tableHeader={this.tableHeader}
            onScroll={this.onScrollFromNative}
          />
        </Table.Provider>
        <h4>External scroll bar created from HorizontalScrollBar</h4>
        <HorizontalScrollBar
          width={tableWidth}
          scrollWidth={totalColumnsWidth}
          left={0}
          top={0}
          onScroll={ this.onScrollFromThirdParty }
        />
      </div>
    );
  }
}

class Container extends React.Component {
  render() {
    const tableData = generateRandomTableData();
    return (
      <div>
        <MyTable rows={tableData.rows} columns={tableData.columns}/>
      </div>
    );
  }
}
<Container />
```
