3.0.0 / 2016-09-01
==================

  * Bug fix - Make sure `scrollOffset` gets a value no matter what. This avoid a React warning.

2.0.5 / 2016-08-26
==================

  * Improvement - Allow `onScroll` handler to be defined for `Body`. Previously it overrode that.

2.0.4 / 2016-08-24
==================

  * Bug fix - Calculate extra padding to table body so that header and body widths match even if a scrollbar is visible.

1.1.2 / 2016-08-04
==================

  * Bug fix - Fix `reactabular-table` import. Missing `* as`.

1.1.1 / 2016-08-04
==================

  * Bug fix - Fix `reactabular-table` import. It points to the correct package now.

1.1.0 / 2016-08-03
==================

  * Improvement - Added `getRef` for getting references to underlying DOM elements.
  * Improvement - Moved `reactabular-table` as a peer dependency as I realized it's better to let the user decide which version of the table to use.

1.0.3 / 2016-07-27
==================

  * Improvement - Make `tableHeader` prop check looser.

0.1.0 / 2016-07-26
==================

  * Initial release.
