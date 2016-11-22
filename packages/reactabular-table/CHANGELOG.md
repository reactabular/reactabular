7.1.0 / 2016-xx-xx
==================

  * Feature - Support `onRow` at `Table.Header`.
  * Bug fix - Skip functions at `BodyRow` `shouldComponentUpdate`.

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
