If you want to override the default elements, pass a React component through the `components` prop. It should render passed props like this:

```javascript
const wrapper = props => <div {...props} className="table" />;

...

<Table.Provider components={{ table: wrapper }} ...>
  <Table.Body rows={rows} rowKey="id" />
</Table.Provider>
```

Note that the example discard possible `className` as it overrides so you may want to merge it using a utility such as [classnames](https://www.npmjs.com/package/classnames).

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

## See Also

* [Fixed Width Columns](/examples/fixed-width-columns)
