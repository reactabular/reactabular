7.1.0 / 2016-xx-xx
==================

  * Feature - Expose `dnd.draggableRow`. This allows you to use row dragging with virtualization. Example: `body.row = dnd.draggableRow(Virtualized.BodyRow)`.

7.0.0 / 2016-11-03
==================

  * Breaking - Rework `moveRows` interface. Instead of `moveRows(rows, { sourceRowId, targetRowId }) => rows` it's `moveRows({ sourceRowId, targetRowId }) => (rows) => <movedRows>` now.

2.0.0 / 2016-08-16
==================

  * Initial release.
