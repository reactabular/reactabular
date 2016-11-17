If you want to override the default elements, pass a React component through the `components` prop. It should render `children` like this:

```javascript
const wrapper = ({ children }) => (
  <div className="table">
    {children}
  </div>
);

...

<Table.Provider components={{ table: wrapper }} ...>
  <Table.Body rows={rows} rowKey="id" />
</Table.Provider>
```

The defaults are as follows:

```javascript
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

If you set `component.body.row.shouldComponentUpdate = true`, you can override the default `shouldComponentUpdate` behavior. `reactabular-virtualized` uses this feature.

## See Also

* [Fixed Width Columns](/examples/fixed-width-columns)
