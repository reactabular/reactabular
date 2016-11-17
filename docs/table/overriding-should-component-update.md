Given the default `shouldComponentUpdate` for `Table` body can be somewhat strict, it is possible to override it with a custom handler. If you set `true` instead, then it will skip `shouldComponentUpdate` check entirely.

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
