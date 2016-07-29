1.0.11 / 2016-07-29
===================

  * Improvement - Add sorting numbers to the header so you know in which order sorting rules are applied.
  * Improvement - Allow column sorting status to be reset by doubleclicking on a column header.
  * Improvement - Add support for row selection. Capture the selected row through `onSelectRow`.

1.0.8 / 2016-07-28
==================

  * Improvement - Make `tableWidth` and `tableHeight` checks looser. You might want to pass number, string, or something. Perhaps this can be constrained further.


1.0.7 / 2016-07-28
==================

  * Bug fix - Include `dist-modules` to the distribution version. `preversion` script obviously misses.

1.0.6 / 2016-07-27
==================

  * Bug fix - Merge column definition `props.className` correctly. Previously it discarded possible value.
  * Improvement - Add styling hooks. Now you can attach classes to the table structure (table, thead, tbody).
  * Improvement - Add `onDragColumn` and `onMoveColumns` hooks.

1.0.5 / 2016-07-27
==================

  * Improvement - Add column visibility to the example.
  * Improvement - Render `EasyTable` in a fixed viewport.
  * Bug fix - Do not re-initialize styles if columns change. Without this CSS resets. I may have to revisit this decision but it seems logical now.
  * Improvement - Support `draggable` header flag.

1.0.3 / 2016-07-26
==================

  * Improvement - Resolve nested and `cell.resolve` based data.
  * Improvement - Support search with highlighting through a `query` prop.

0.1.0 / 2016-07-26
==================

  * Initial release.
