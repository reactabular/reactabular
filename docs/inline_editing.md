# Inline Editing a Table

Reactabular supports inline editing through a behavior and specific `editors` that implement a small editing interface. Consider the example below:

```jsx
import { behaviors, editors, Table } from 'reactabular';
import findIndex from 'lodash/findIndex';

...

class DemoTable extends React.Component {
  constructor(props) {
    super(props);

    const editable = behaviors.edit.bind(
      null,
      {
        // Get the edited property
        getEditProperty: () => this.state.editedCell,
        // Set the property when the user tries to activate editing
        onActivate: idx => this.setState({ editedCell: idx }),
        // Capture the value when the user has finished
        onValue: (value, { id }, property) => {
          const idx = findIndex(this.state.data, { id });

          this.state.data[idx][property] = value;

          this.setState({ editedCell: null, data });
        },
      }
    );

    this.state = {
      editedCell: null, // Track the edited cell somehow
      columns: [
        {
          property: 'position',
          header: 'Position',
          cell: editable({
            editor: editors.input(),
            // You can pass a custom formatter here
            //formatter: highlighter('name')
          })
        },
        ...
      ],
      data: [...]
      ...
    };
  }
  render() {
    const { data } = this.state;

    return (
      <Table columns={columns} data={data}>
        <Table.Header />

        <Table.Body rowKey="id" />
      </Table>
    );
  }
}
```

The library comes with a couple of basic editors. As long as you follow the same interface (`value`, `onValue` properties), your editor should just work with the system.
