7.0.0 / 2016-11-03
==================

  * Breaking - Rework `moveRows` interface. Instead of `moveRows(rows, { sourceRowId, targetRowId }) => rows` it's `moveRows({ sourceRowId, targetRowId }) => (rows) => <movedRows>` now.

2.0.0 / 2016-08-16
==================

  * Initial release.
