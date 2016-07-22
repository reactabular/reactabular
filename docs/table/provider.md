`Table.Provider` is the core of Reactabular. It sets up a [context](https://facebook.github.io/react/docs/context.html) and maps the `column` definition to its children components. The following example illustrates the basic idea.

```jsx
/*
import { Table } from 'reactabular';
*/

const { Table } = reactabular;

const rows = [
  {
    id: 100,
    name: 'Adam',
    dad: 'John',
    lovesBeeGees: true
  },
  {
    id: 101,
    name: 'Brian',
    dad: 'George',
    lovesBeeGees: false
  },
];

const columns = [
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
      label: 'Dad'
    },
    cell: {
      property: 'dad'
    }
  }
];

<Table.Provider
  className="pure-table pure-table-striped"
  columns={columns}
>
  <Table.Header />

  <Table.Body rows={rows} rowKey="id" />
</Table.Provider>
```
