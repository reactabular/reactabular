7.1.0 / 2016-xx-xx
==================

  * Feature - Add `resolve.columnChildren({ columns, childrenField = 'children' }) => <resolved columns>`. Earlier this was in `reactabular-utils` but it fits this namespace better.
  * Breaking - Allow resolvers to be composed more easily. Now the API follows the pattern `(extra) => (rowData) => <resolved row>. This means the functions fit within `compose` like this:

```javascript
const resolver = resolve.resolve({
  columns,
  method: (extra) => compose(
    resolve.byFunction('cell.resolve')(extra),
    resolve.nested(extra)
  )
});
```

2.0.2 / 2016-08-17
==================

  * Bug fix - Make sure `resolve` does not crash if `rows` aren't provided. It will return an empty array in that case.

2.0.0 / 2016-08-16
==================

  * Breaking - Rework `resolve` interface to be object based and pass row index through it.
  * Feature - Implement `resolve.index`. This attached the row indices to `_index`. That can be handy data to have for optimization.

1.0.1 / 2016-07-26
==================

  * Feature - Make sure `undefined` keys aren't included in the resolved result.

1.0.0 / 2016-07-25
==================

  * Initial release.
