Given sometimes your data might be nested and you might want to resolve a value like `name.first` as the cell value, Reactabular provides a `resolve` helper for that purpose. Pass your data through it (`resolve({ columns })(data)`) before handing it to `Table.Provider`.

**Example:**

```jsx
const columns = [
  {
    header: {
      label: 'Color'
    },
    cell: {
      property: 'color'
    }
  },
  {
    header: {
      label: 'Name'
    },
    children: [
      {
        header: {
          label: 'First Name'
        },
        cell: {
          property: 'name.first'
        }
      },
      {
        header: {
          label: 'Last Name'
        },
        cell: {
          property: 'name.last'
        }
      }
    ]
  },
  {
    header: {
      label: 'About'
    },
    children: [
      {
        header: {
          label: 'Company'
        },
        cell: {
          property: 'company'
        }
      },
      {
        header: {
          label: 'Sentence'
        },
        cell: {
          property: 'sentence'
        }
      }
    ]
  }
];

const data = [
  {
    id: 1,
    color: 'red',
    name: {
      first: 'John',
      last: 'Johnson'
    },
    company: 'John Inc.',
    sentence: 'consequatur nihil minima corporis omnis nihil rem'
  },
  {
    id: 2,
    color: 'blue',
    name: {
      first: 'Mike',
      last: 'Mikeson'
    },
    company: 'Mike Inc.',
    sentence: 'a sequi doloremque sed id quo voluptatem voluptatem ut voluptatibus'
  }
];

<div>{JSON.stringify(resolve({ columns })(data), null, 2)}</div>
```