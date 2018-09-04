8.16.0 / 2018-09-04
==================

  * Feature - Added hovered class to hovered row. #358

8.12.0 / 2017-10-05
==================

  * Chore - Support React 16. #324

8.7.1 / 2017-03-16
==================

  * Bug fix - Don't create a new component type on render to avoid issues with controlled components. #287

8.6.0 / 2017-01-16
==================

  * Bug fix - Bump lodash peer dependency to v4 minimum. This was expected already, but the version was wrong.

8.0.0 / 2016-11-27
==================

  * Feature - Expose `dnd.draggableRow`. This allows you to use row dragging with virtualization. Example: `body.row = dnd.draggableRow(Virtualized.BodyRow)`.
  * Feature - `dnd.draggableRow` hooks into row level (`onRow({ rowId })`) props `onCanMove({ rowId })`, `onMoveStart({ rowId })`, `onMove({ sourceRowId, targetRowId })`, and `onMoveEnd({ rowId })` instead of just `onMove`.
  * Feature - Fail fas if `moveLabels` is missing data.
  * Feature - Expose `move` core algorithm. This can be useful standalone.

7.0.0 / 2016-11-03
==================

  * Breaking - Rework `moveRows` interface. Instead of `moveRows(rows, { sourceRowId, targetRowId }) => rows` it's `moveRows({ sourceRowId, targetRowId }) => (rows) => <movedRows>` now.

2.0.0 / 2016-08-16
==================

  * Initial release.
