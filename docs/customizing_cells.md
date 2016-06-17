# Customizing Cells

Reactabular's cell interface is useful when you need to alter cell output formatting or attach interactive functionality to them. The same interface is available for the header although it works a little differently there. Consider the following example:

```javascript
const columns = [
  {
    property: 'name',
    header: sortable(
      <div>
        <input
          type="checkbox"
          onClick={() => console.log('clicked')}
          style={{ width: '20px' }}
        />
        <span>Name</span>
      </div>
    )
    // No cell provided so just show data as-is
  },
  {
    property: 'position',
    header: sortable('Position'),
    cell: ({ value }) => value // No customization
  },
  {
    property: 'dad',
    header: 'Dad',
    // You can dig nested data and display it if you want
    cell: ({ value }) => `id: ${value.id} , name: ${value.name}`,
  },
  {
    property: 'salary',
    header: 'Salary'
    // Show salary on double click
    cell: ({ value }) => (
      <span onDoubleClick={() => alert(`salary is ${value}`)}>
        {value}
      </span>
    )
  }
];
```
