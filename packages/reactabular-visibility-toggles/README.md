`reactabular-visibility-toggles` provides a React component for rendering visibility toggles for table columns.

**Example:**

```jsx
/*
import React from 'react';
import { Table } from 'reactabular';
import cloneDeep from 'lodash/cloneDeep';
import VisibilityToggles from 'reactabular-visibility-toggles';
*/

class ToggleColumnsTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        {
          property: 'name',
          header: {
            label: 'Name'
          },
          visible: true
        },
        {
          property: 'age',
          header: {
            label: 'Age'
          },
          visible: false
        },
        {
          property: 'color',
          header: {
            label: 'Color'
          },
          cell: {
            transforms: [color => ({ style: { color } })]
          },
          visible: true
        }
      ],
      rows: [
        {
          id: 100,
          name: 'Adam',
          age: 12,
          color: 'red'
        },
        {
          id: 101,
          name: 'Brian',
          age: 44,
          color: 'green'
        },
        {
          id: 102,
          name: 'Mike',
          age: 25,
          color: 'blue'
        }
      ]
    };

    this.onToggleColumn = this.onToggleColumn.bind(this);
  }
  render() {
    const { columns, rows } = this.state;

    return (
      <div>
        <VisibilityToggles
          columns={columns}
          onToggleColumn={this.onToggleColumn}
        />

        <Table.Provider
          columns={columns.filter(column => column.visible)}
        >
          <Table.Header />

          <Table.Body rows={rows} rowKey="id" />
        </Table.Provider>
      </div>
    );
  }
  onToggleColumn(columnIndex) {
    const columns = cloneDeep(this.state.columns);

    columns[columnIndex].visible = !columns[columnIndex].visible;

    this.setState({ columns });
  }
}

<ToggleColumnsTable />
```
