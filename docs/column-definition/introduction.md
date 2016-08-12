The column definition is an array of objects. Each maps to a specific table column and describes what rows it should display and how. It also manages headers. A minimal structure looks defining a column with header "Name" and fetching rows using the `name` property looks like this:

```javascript
const columns = [
  {
    property: 'name',
    header: {
      label: 'Name'
    }
  }
];
```
