/* eslint-disable no-shadow */
import React from 'react';
import { Table } from '../../src';

export default class ResizableColumnsTable extends React.Component {
  constructor(props) {
    super(props);

    const resizable = resizableColumn({
      getWidth: column => column.props.style.width,
      onDrag: (width, { columnIndex }) => {
        const columns = this.state.columns;
        const column = columns[columnIndex];

        column.props.style = {
          ...column.props.style,
          width
        };

        this.setState({ columns });
      }
    });

    this.state = {
      columns: [
        {
          props: {
            style: {
              width: 200
            }
          },
          header: {
            label: 'Name',
            format: resizable
          },
          cell: {
            property: 'name'
          }
        },
        {
          props: {
            style: {
              width: 300
            }
          },
          header: {
            label: 'Address',
            format: resizable
          },
          cell: {
            property: 'address'
          }
        },
        {
          props: {
            style: {
              width: 150
            }
          },
          header: {
            label: 'Age',
            format: resizable
          },
          cell: {
            property: 'age'
          }
        }
      ],
      data: [
        {
          id: 1,
          name: 'This is a very long title that goes on and on',
          address: '85 Peachfield Road',
          age: 55
        },
        {
          id: 2,
          name: 'Here is a shorter one',
          address: '77 Newmarket Road',
          age: 42
        }
      ]
    };
  }
  render() {
    const { data, columns } = this.state;

    return (
      <Table
        columns={columns}
        data={data}
        rowKey="id"
        style={{ width: 'auto' }}
      >
        <Table.Header />

        <Table.Body />
      </Table>
    );
  }
}

// Adapted from https://stackoverflow.com/questions/20926551/recommended-way-of-making-react-component-div-draggable
const resizableColumn = ({ getWidth, onDrag }) => (label, extraParameters) => {
  class ResizableColumn extends React.Component {
    constructor(props) {
      super(props);

      // Track coordinate data at instance, no React state needed
      this.startX = null;
      this.startWidth = null;

      this.onMouseDown = this.onMouseDown.bind(this);
      this.onMouseMove = this.onMouseMove.bind(this);
      this.onMouseUp = this.onMouseUp.bind(this);
    }
    render() {
      return (
        <div>
          <span>{label}</span>
          <span
            className="resize-handle"
            style={{
              backgroundColor: '#aaa',
              cursor: 'col-resize',
              float: 'right',
              width: '0.25em'
            }}
            onMouseDown={this.onMouseDown}
          >&nbsp;</span>
        </div>
      );
    }
    onMouseDown(e) {
      e.stopPropagation();
      e.preventDefault();

      document.addEventListener('mousemove', this.onMouseMove);
      document.addEventListener('mouseup', this.onMouseUp);

      this.startX = e.clientX;
      this.startWidth = getWidth(extraParameters.column);
    }
    onMouseMove(e) {
      e.stopPropagation();
      e.preventDefault();

      const offset = this.startX - e.clientX;

      onDrag(
        Math.max(this.startWidth - offset, 1), // Do not allow non-zero widths
        extraParameters
      );
    }
    onMouseUp(e) {
      e.stopPropagation();
      e.preventDefault();

      document.removeEventListener('mousemove', this.onMouseMove);
      document.removeEventListener('mouseup', this.onMouseUp);
    }
  }

  return React.createElement(ResizableColumn);
};
