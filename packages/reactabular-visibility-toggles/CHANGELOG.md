7.1.0 / 2016-xx-xx
==================

  * Bug fix - Show a visibility toggle only for those columns that have `header` defined.
  * Breaking - Generalize `onToggleColumn`. It's `onToggleColumn({ column, columnIndex })` now instead of `onToggleColumn(columnIndex)`. This way it works with data not depending on index.
  * Feature - Expose `isVisible(column)`. It checks `column.visible` by default. You can override the default behavior through this prop.

2.0.0 / 2016-08-16
==================

  * Initial release.
