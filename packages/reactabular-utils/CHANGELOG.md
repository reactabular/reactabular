7.1.0 / 2016-xx-xx
==================

  * Feature - Add `columnsAreEqual` checker.
  * Breaking - Move `utils.countRowSpan` has been dropped as it's not needed here anymore (moved to `table-resolver`).
  * Breaking - Drop `utils.mergeClassNames`. This was replaced by [classnames](https://www.npmjs.org/package/classnames) internally and the column definition accepts formats used by `classnames`.
  * Breaking - Generalize `utils.mergePropPair` as `utils.mergeProps`. It accepts an arbitrary amount of prop collections now.
  * Breaking - Drop `utils.resolveBodyColumns`, `utils.resolveHeaderRows`, `utils.resolveRowKey`. The functionality was moved to the `table-resolver` package.
  * Breaking - Drop `utils.rowsAreEqual`. Same as `lodash.isEqual(oldRows, newRows)`.
  * Feature - `evaluateTransforms` will throw if all transforms aren't functions.
  * Breaking - Move `utils.evaluateFormatters` and `utils.evaluateTransforms` to `reactabular-table`. Those aren't used elsewhere so that makes a lot of sense.

7.0.0 / 2016-11-03
==================

  * Bug fix - If `rowKey` value is zero, `resolveRowKey` should return `0-row`.
  * Feature - Allow `colSpan` and `rowSpan` to be overridden at `resolveHeaderRows`.

3.0.0 / 2016-09-01
==================

  * Add `resolveRowKey`.

0.1.0 / 2016-07-22
==================

  * Initial release.
