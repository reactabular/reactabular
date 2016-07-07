Given sometimes you might want to display data in a nested manner, there's a `children` field for that. It accepts an array of column definitions and is recursive. If `children` has been set, then `cell` specific sibling field won't do anything. `header` will still work as usual.

**Example:**

```code
lang: js
---
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
    },
    {
      header: {
        label: 'Company'
      },
      cell: {
        property: 'company'
      }
    },
  ]
}
```
