/* eslint-disable no-console, no-alert, no-unused-vars, react/prop-types */
import React from 'react';
import classnames from 'classnames';
import find from 'lodash/find';
import findIndex from 'lodash/findIndex';
import {
  Table
} from '../../src';

class SelectionTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [
        // The data has been sorted so that children are after their parents
        {
          id: 100,
          name: 'Adam',
          age: 55
        },
        {
          id: 102,
          name: 'Joe',
          age: 12
        },
        {
          id: 101,
          name: 'Brian',
          age: 62
        },
        {
          id: 103,
          name: 'Mike',
          age: 22
        },
        {
          id: 104,
          name: 'Jack',
          age: 33
        }
      ],
      columns: [
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
            label: 'Age'
          },
          cell: {
            property: 'age'
          }
        }
      ],
      selectedRowId: null
    };

    this.onRowSelected = this.onRowSelected.bind(this);
    this.onKeyPressed = this.onKeyPressed.bind(this);
  }
  componentDidMount() {
    window.addEventListener('keydown', this.onKeyPressed);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyPressed);
  }
  render() {
    const { columns, data, selectedRowId } = this.state;

    return (
      <div>
        <Table.Provider
          className="pure-table pure-table-striped"
          columns={columns}
          data={data}
          rowKey="id"
        >
          <Table.Header />

          <Table.Body
            row={(row, rowIndex) => ({
              className: classnames(
                rowIndex % 2 ? 'odd-row' : 'even-row',
                row.id === selectedRowId && 'selected-row'
              ),
              onClick: () => this.onRowSelected(row)
            })}
          />
        </Table.Provider>

        <div className="details-container">
          <h2>Details</h2>

          <div className="details">
            {JSON.stringify(find(data, { id: selectedRowId }), null, 2)}
          </div>
        </div>
      </div>
    );
  }
  onRowSelected(row) {
    this.setState({ selectedRowId: row.id });
  }
  onKeyPressed(e) {
    const { data, selectedRowId } = this.state;
    const idx = findIndex(data, { id: selectedRowId });

    // No selection yet, escape
    if (idx < 0) {
      return;
    }

    // Arrow Up
    if (e.keyCode === 38 && idx > 0) {
      e.preventDefault();

      this.setState({
        selectedRowId: data[idx - 1].id
      });
    }

    // Arrow Down
    if (e.keyCode === 40 && idx < data.length - 1) {
      e.preventDefault();

      this.setState({
        selectedRowId: data[idx + 1].id
      });
    }
  }
}

export default SelectionTable;
