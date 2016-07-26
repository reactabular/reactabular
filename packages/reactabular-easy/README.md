Given Reactabular is flexible by design, it's not the easiest to use and you may have to do quite a bit of wiring to make it work the way you want. `reactabular-easy` has been designed to make using it easier. It is opinionated and takes away some power. But on the plus side it allows you to render a fully featured table faster.

```jsx
const schema = {
  type: 'object',
  properties: {
    id: {
      type: 'string'
    },
    name: {
      type: 'string'
    },
    age: {
      type: 'integer'
    },
    boss: {
      $ref: '#/definitions/boss'
    }
  },
  required: ['id', 'age', 'boss'],
  definitions: {
    boss: {
      type: 'object',
      properties: {
        name: {
          type: 'string'
        }
      },
      required: ['name']
    }
  }
};
const rows = generateRows(20, schema);

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
      label: 'Age',
      sortable: true
    },
    cell: {
      property: 'age'
    }
  },
  {
    header: {
      label: 'Boss',
      sortable: true
    },
    cell: {
      property: 'boss.name'
    }
  }
];

<EasyTable rows={rows} rowKey="id" columns={columns} />
```
