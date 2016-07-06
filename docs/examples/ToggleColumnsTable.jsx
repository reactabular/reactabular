/* eslint-disable new-cap */
import React from 'react';
import { Table } from '../../src';

export default class ToggleColumnsTable extends React.Component {
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
      data: [
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
    const { columns, data } = this.state;

    return (
      <div>
        <div
          className="visibility-toggles"
          style={{ backgroundColor: '#ddd', padding: '1em', margin: '1em' }}
        >
          {columns.map(({ header: { label }, visible }, columnIndex) => (
            <label
              className="visibility-toggle"
              style={{ marginRight: '1em' }}
              key={label}
            >
              <span>{label}</span>
              <input
                type="checkbox"
                style={{ marginLeft: '0.5em' }}
                checked={visible}
                onChange={() => this.onToggleColumn(columnIndex)}
              />
            </label>
          ))}
        </div>

        <Table.Provider
          columns={columns.filter(column => column.visible)}
          data={data}
          rowKey="id"
        >
          <Table.Header />

          <Table.Body />
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
