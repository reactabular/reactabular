7.0.0 / 2016-xx-xx
==================

  * Breaking - Rework `moveRows` interface. Instead of `moveRows(rows, { sourceRowId, targetRowId }) => rows` it's `moveRows({ rows, sourceRowId, targetRowId }) => { rows, sourceIndex, targetIndex }` now.

2.0.0 / 2016-08-16
==================

  * Initial release.
