Given Reactabular is flexible by design, it's not the easiest to use and you may have to do quite a bit of wiring to make it work the way you want. `reactabular-easy` has been designed to make using it easier. It is opinionated and takes away some power. But on the plus side it allows you to render a fully featured table faster.

```jsx
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
  {
    id: 102,
    name: 'Jake',
    dad: 'George',
    lovesBeeGees: false
  },
  {
    id: 103,
    name: 'Bob',
    dad: 'George',
    lovesBeeGees: true
  }
];

const columns = [
  {
    header: {
      label: 'Name',
      sortable: true,
      resizable: true
    },
    cell: {
      property: 'name'
    },
    props: {
      style: {
        width: 200
      }
    }
  },
  {
    header: {
      label: 'Dad',
      sortable: true
    },
    cell: {
      property: 'dad'
    }
  }
];

<EasyTable rows={rows} rowKey="id" columns={columns} />
```
