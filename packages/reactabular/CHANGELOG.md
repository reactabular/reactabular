1.2.3 / 2016-08-08
==================

  * Improvement - reactabular - New `search-columns` module for searching per column.

1.2.2 / 2016-08-07
==================

  * Bug fix - resizable - Fix README example as Sticky API has been simplified (no need for ReactDOM anymore).


1.2.1 / 2016-08-05
==================

  * Improvement - edit - Expose `event` to `onActivate`.
  * Improvement - easy - Push `reactabular` and `reactabular-utils` as peer dependencies. This way you have better control over which versions to consume at your project.

1.2.0 / 2016-08-05
==================

  * Bug fix - table - Pass unresolved values to `Table.Body` transforms instead of resolved ones.

1.1.6 / 2016-08-05
==================

  * Improvement - edit - Allow `activateEvent` (default `onClick`) to be overridden.
  * Improvement - easy - Trigger `onMoveColumns` only after moving columns has finished.
  * Improvement - easy - Expose `selectedRowId`. It defaults to `id`, but if your selection logic relies on some other field, you can change it now.
  * Improvement - reactabular - New `select` module for handling row selections.

1.1.5 / 2016-08-04
==================

  * Improvement - Attach `NODE_ENV` checks to `propTypes`. Smaller size for production usage.

1.1.4 / 2016-08-04
==================

  * Bug fix - sort - Do not crash if column `cell` definition is missing. #178

1.1.3 / 2016-08-04
==================

  * Bug fix - easy - If a header is set both `sortable` and `resizable`, allow custom formatter to used still.

1.1.2 / 2016-08-04
==================

  * Bug fix - sticky - Fix `reactabular-table` import. Missing `* as`.

1.1.1 / 2016-08-04
==================

  * Bug fix - sticky - Fix `reactabular-table` import. It points to the correct package now.
  * Improvement - table - Drop `lodash/omit` dependency.

1.1.0 / 2016-08-03
==================

  * Improvement - edit - Allow `editingProps` (`value`/`onValue`) to be overridden.
  * Improvement - table - Added `getRef` for getting references to underlying DOM elements.
  * Improvement - sticky - Added `getRef` for getting references to underlying DOM elements.
  * Improvement - sticky - Moved `reactabular-table` as a peer dependency as I realized it's better to let the user decide which version of the table to use.
  * Improvement - easy - Dropped dependency on react-dom.

1.0.11 / 2016-07-29
===================

  * Bug fix - sort - `sort.reset` accepts object properly now. Earlier it bailed out too early.
  * Improvement - Add sorting numbers to the header so you know in which order sorting rules are applied.
  * Improvement - Allow column sorting status to be reset by doubleclicking on a column header.

1.0.10 / 2016-07-29
===================

  * Improvement - sort - `sort.sort` accepts `event` parameter now. It defaults to `onClick`.
  * Improvement - sort - `sort.reset` is a new transform that can be used to remove the given column from the sorting rules.
  * Improvement - sort - `sort.header` is a new formatter that can be used to apply sorting. This is handy if you use `sort.reset`.

1.0.8 / 2016-07-27
==================

  * Improvement - easy - Make `tableWidth` and `tableHeight` checks looser.

1.0.6 / 2016-07-27
==================

  * Bug fix - easy - Merge column definition `props.className` correctly. Previously it discarded possible value.
  * Improvement - easy - Add styling hooks. Now you can attach classes to the table structure (table, thead, tbody).
  * Improvement - easy - Add `onDragColumn` and `onMoveColumns` hooks.

1.0.5 / 2016-07-27
==================

  * Improvement - highlight - Do not pass `undefined` keys to `_highlights` data.
  * Improvement - easy - Add column visibility to the example.
  * Improvement - easy - Render `EasyTable` in a fixed viewport.
  * Bug fix - easy - Do not re-initialize styles if columns change. Without this CSS resets. I may have to revisit this decision but it seems logical now.
  * Improvement - easy - Support `draggable` header flag.

1.0.3 / 2016-07-27
==================

  * Improvement - sticky - Make `tableHeader` prop check looser.
  * Improvement - easy - Resolve nested and `cell.resolve` based data.
  * Improvement - easy - Support search with highlighting through a `query` prop.

1.0.2 / 2016-07-26
==================

  * Improvement - resizable - New module for resizing columns.
  * Improvement - sticky - New pair of components (`Sticky.Header`, `Sticky.Body`) that allow you to render data within a fixed viewport.

1.0.1 / 2016-07-26
==================

  * Improvement - resolve - Make sure `undefined` keys aren't included in the resolved result.
  * Bug fix - highlight - Retain original data while highlighting rows.

1.0.0 / 2016-07-25
==================

  * Complete rewrite. Too many changes to mention. Please study the documentation for details.

0.14.2 / 2016-06-13
===================

  * Bug fix - Fix `postinstall` script for Node 0.10. #147 @Gudahtt

0.14.1 / 2016-06-11
===================

  * Bug fix - Use a ref at `input` editor over `this.getDOMNode()` given latter was deprecated in React 15.

0.14.0 / 2016-06-09
===================

  * Breaking - Force `rowKey` to be set. This helps with performance so better set that. #135
  * Improvement - Drop dependency on `react/lib/update`. Smaller bundle this way too.
  * Improvement - Drop dependency on `lodash/merge`.

0.13.0 / 2016-06-07
===================

  * Feature - Support for multiple saerch filters. #138 @szdc

0.12.1 / 2016-04-08
===================

  * Expand React peer dependency range to include React 15.

0.12.0 / 2016-03-22
===================

  * Breaking - Bump lodash minimum version to 4.0.
  * Feature - Import only specific lodash functions. #134 @callahad

0.11.2 / 2016-02-23
===================

  * Bug fix - Don't attempt to merge table cell values. #132 @trun

0.11.1 / 2016-02-18
===================

  * Feature - Allow `Search` "all" to be translated. #130

0.11.0 / 2016-02-14
===================

  * Bug fix - Cell functions could be skipped when two columns shared the same property. #129 @MrOrz

0.10.4 / 2016-02-13
===================

  * Feature - Relaxed about lodash peer version, now < 5. #128 @FredericHeem

0.10.3 / 2016-01-31
===================

  * Feature - Support multi-column sorts a la react-datagrid (cycle through ascending, descending, none independently). #127 @JeffSanchez

0.10.2 / 2016-01-22
===================

  * Bug Fix - ”formatter shortcut” logic in cell function. #125 @MrOrz

0.10.1 / 2016-01-21
===================

  * Bug Fix - Do not show React elements at search dropdown Only strings and numbers are allowed. #124

0.10.0 / 2016-01-19
===================

  * Bug Fix - Merge props & values of cell functions correctly. #53, #122 @MrOrz
  * Documentation - Correct usage from props.header to props.columnNames. #121 @goldensunliu
  * Documentation - Fix object protocol example. #117 @arkon
  * Demo - Updated react-pagify
  * Demo - Add double click example for cell
  * Breaking - Replaced `className` with `headerClass`. #113 @goldensunliu

0.9.2 / 2015-11-10
==================

  * Feature - Support Node 0.10 again. #112 @bjrmatos
