A simple way to implement toggleable columns is to manage the visibility using a flag and then filter before rendering.

```jsx
/*
import React from 'react';
import { Table } from 'reactabular';

import { VisibilityToggles } from './helpers';
*/

class ToggleColumnsTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        {
          header: {
            label: 'Name'
          },
          cell: {
            property: 'name'
          },
          visible: true
        },
        {
          header: {
            label: 'Age'
          },
          cell: {
            property: 'age'
          },
          visible: false
        },
        {
          header: {
            label: 'Color'
          },
          cell: {
            property: 'color',
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
    const columns = this.state.columns;

    columns[columnIndex].visible = !columns[columnIndex].visible;

    this.setState({ columns });
  }
}

<ToggleColumnsTable />
```
