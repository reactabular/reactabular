8.14.0 / 2017-05-17
===================

  * Fix - Make `components` rename work properly in production as well. #348

8.13.0 / 2017-04-19
===================

  * Refactor - Rename `components` field to `renderers`. The old prop name will be dropped in the next major version although it works for now.

8.12.0 / 2017-10-05
===================

  * Chore - Support React 16. #324

8.8.0 / 2017-04-03
==================

  * Refactor - Refactor `mergePropPair` logic. Now Babel should generate easier code.

8.7.2 / 2017-04-03
==================

  * Bug fix - If there are no transforms, skip processing them entirely.

8.6.0 / 2017-01-16
==================

  * Bug fix - Bump lodash peer dependency to v4 minimum. This was expected already, but the version was wrong.

8.5.0 / 2016-12-20
==================

  * Feature - Drop `deep-diff` dependency. Now it checks through lodash instead. Simpler this way.
  * Bug fix - Allow `rowKey` to be zero. #262

8.4.2 / 2016-12-15
==================

  * Bug fix - Fix false negative for `rowKey` check. Now objects with getters should work as expected. #261

8.1.0 / 2016-11-27
==================

  * Feature - Allow `overflow` to be overridden through `style`. #246

8.0.0 / 2016-11-27
==================

  * Feature - Pass whole column through header/body for extra parameters.
  * Feature - Support `onRow` at `Table.Header`.
  * Feature - Allow `Table.Header` to accept `headerRows` (an array of column definitions) to override default columns. See below.
  * Feature - Move `utils.resolveRowKey`, `utils.evaluateFormatters`, `utils.evaluateTransforms`, `utils.mergeProps`, `utils.columnsAreEqual` to `reactabular-table`.
  * Bug fix - Skip functions at `BodyRow` `shouldComponentUpdate`.
  * Breaking - Generalize `format: <fn>` as `formatters: [<fn>]`. The formatters are applied recursively from left to right: `[f1, f2, f3] => f1(f2(f3(value, extra)))`. This allows composition.
  * Breaking - Extract nested column logic. Now you will have to resolve nested columns before passing them to the table. The advantage of doing this is that now all logic (search/sorting/etc.) works with nested tables. Basic idea:

```javascript
import * as resolve from 'table-resolver';

...

const NestedColumnsTable = () => {
  const resolvedColumns = resolve.columnChildren({ columns });
  const resolvedRows = resolve.resolve({
    columns: resolvedColumns,
    method: resolve.nested
  })(rows);

  return (
    <Table.Provider columns={resolvedColumns}>
      <Table.Header
        headerRows={resolve.headerRows({ columns })}
      />

      <Table.Body
        rows={resolvedRows}
        rowKey="id"
      />
    </Table.Provider>
  );
};

...
```

6.0.0 / 2016-10-14
==================

  * Feature - Allow table body and body row `shouldComponentUpdate` to be overridden.

3.0.6 / 2016-09-12
==================

  * Feature - Allow `BodyRow` `shouldComponentUpdate` to be overridden by setting `components.body.row.shouldComponentUpdate = true`.

3.0.0 / 2016-09-01
==================

  * Breaking - `onRow` accepts `row, { rowIndex, rowKey }` instead of `row, rowIndex`.

2.0.5 / 2016-08-26
==================

  * Feature - Allow `Body` `rowKey` to be defined as a function (`({ rowData, rowIndex }) => {... return a rowKey ...}`). #193

2.0.0 / 2016-08-16
==================

  * Feature - Improve performance by pushing `onRow` check lower in the component hierarchy.

1.2.3 / 2016-08-08
==================

  * Feature - Make `rowKey` propType check compatible with React 15.3. It should give you better output during development now.

1.2.0 / 2016-08-05
==================

  * Bug fix - Pass unresolved values to `Table.Body` transforms instead of resolved ones.

1.1.1 / 2016-08-04
==================

  * Feature - Drop `lodash/omit` dependency.

1.1.0 / 2016-08-03
==================

  * Feature - Added `getRef` for getting references to underlying DOM elements.

1.0.0 / 2016-07-25
==================

  * Initial release.
