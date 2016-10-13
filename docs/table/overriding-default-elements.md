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

## Overriding `shouldComponentUpdate`

Given the default `shouldComponentUpdate` for Table body can be somewhat strict, it is possible to override it with a custom handler. If you set `true` instead, then it will skip `shouldComponentUpdate` check entirely.

**Example:**

```javascript
const BodyWrapper = props => <tbody {...props} />;
BodyWrapper.shouldComponentUpdate = function (nextProps, nextState, nextContext) {
  // Perform a custom check now
  // this.props is available here too
  return true;
};
// You can also use
// BodyWrapper.shouldComponentUpdate = true;
const RowWrapper = props => <tr {...props} />;
RowWrapper.shouldComponentUpdate = function (nextProps) {
  // Perform a custom check now
  // this.props is available here too
  return true;
};
// RowWrapper.shouldComponentUpdate = true;

...

<Table.Provider
  columns={columns}
  components={{
    body: {
      wrapper: BodyWrapper,
      row: RowWrapper
    }
  }}
>
  <Table.Body
    rows={rows}
    rowKey="name"
  />
</Table.Provider>
```

## See Also

* [Fixed Width Columns](/examples/fixed-width-columns)
