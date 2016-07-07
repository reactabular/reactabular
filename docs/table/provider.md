`Table.Provider` is the core of Reactabular. It sets up a [context](https://facebook.github.io/react/docs/context.html) and maps `column` and `data` definitions to its children components. The following example illustrates the basic idea:

```react
/*
import { Table } from 'reactabular';
*/

const data = [
  {
    id: 100,
    name: 'Adam',
    dad: {
      id: 20,
      name: 'John'
    },
    lovesBeeGees: true
  },
  {
    id: 101,
    name: 'Brian',
    dad: {
      id: 22,
      name: 'George'
    },
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
      property: 'dad.name'
    }
  }
];

<Table.Provider
  className="pure-table pure-table-striped"
  columns={columns}
  data={data}
  rowKey="id"
>
  <Table.Header />

  <Table.Body />
</Table.Provider>
```

## Overriding the Default Elements

If you want to override the default elements for some reason, pass a React component through the `components` prop. It should render `children` like this:

```code
lang: jsx
---
const wrapper = ({ children }) => (
  <div className="table">
    {children}
  </div>
);

...

<Table.Provider components={{ table: wrapper }} ...>
  <Table.Body />
</Table.Provider>
```

The defaults are as follows:

```code
lang: js
---
{
  components: {
    table: 'table',
    header: {
      wrapper: 'thead',
      row: 'tr',
      cell: 'th'
    },
    body: {
      wrapper: 'tbody',
      row: 'tr',
      cell: 'td'
    }
  }
};
```
