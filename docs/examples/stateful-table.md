This demonstration shows how to implement a stateful wrapper on top of Reactabular. The technique is handy if you want to wrap boilerplate and push abstraction level of the column definition higher.

```react
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
  {
    id: 102,
    name: 'Jake',
    dad: {
      id: 22,
      name: 'George'
    },
    lovesBeeGees: false
  },
  {
    id: 103,
    name: 'Bob',
    dad: {
      id: 22,
      name: 'George'
    },
    lovesBeeGees: true
  }
];

const columns = [
  {
    header: {
      label: 'Name',
      sortable: true
    },
    cell: {
      property: 'name'
    }
  },
  {
    header: {
      label: 'Dad',
      sortable: true
    },
    cell: {
      property: 'dad.name'
    }
  }
];

<StatefulTable data={data} columns={columns} rowKey="id" />
```
