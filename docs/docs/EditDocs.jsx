/* eslint-disable max-len */
import React from 'react';
import { ReactSpecimen } from 'catalog';
import findIndex from 'lodash/findIndex';
import { CustomPage } from '../components';
import { EditorsTable } from '../tables';
import {
  behaviors, editors, Table,
} from '../../src';

class EditableTable extends React.Component {
  constructor(props) {
    super(props);

    const editable = behaviors.edit.bind(
      null,
      {
        // Get the edited property
        getEditProperty: () => this.state.editedCell,

        // Set the property when the user tries to activate editing
        onActivate: idx => this.setState({
          editedCell: idx,
        }),

        // Capture the value when the user has finished
        onValue: (value, { id }, property) => {
          const idx = findIndex(this.state.data, { id });

          this.state.data[idx][property] = value;

          this.setState({
            editedCell: null,
            data: this.state.data,
          });
        },
      }
    );

    this.state = {
      editedCell: null, // Track the edited cell somehow
      columns: [
        {
          property: 'name',
          header: 'Name',
          cell: editable({
            editor: editors.input(),
            // You can pass a custom formatter here
            //formatter: highlighter('name')
          }),
        },
      ],
      data: [
        {
          id: 100,
          name: 'Adam',
        },
        {
          id: 101,
          name: 'Brian',
        },
      ],
    };
  }
  render() {
    const { columns, data } = this.state;

    return (
      <Table columns={columns} data={data}>
        <Table.Header />

        <Table.Body rowKey="id" />
      </Table>
    );
  }
}

export default () => (
  <CustomPage>
    <p>
      Reactabular supports inline editing through a behavior and specific <code>editors</code> that implement a small editing interface. The FullTable example illustrates how to achieve the same result using a modal.
    </p>

    <p>
      The library comes with a couple of basic editors. As long as you follow the same interface (`value`, `onValue` properties), your editor should just work with the system.
    </p>

    <ReactSpecimen span={6}>
      <EditableTable />
    </ReactSpecimen>

    <h2>Available Editors</h2>

    <EditorsTable />
  </CustomPage>
);
