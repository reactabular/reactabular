7.1.0 / 2016-xx-xx
==================

  * Bug fix - Improve horizontal scrolling performance when used with reactabular-sticky. If it detects Y didn't change while scrolling, it skips rendering now.
  * Breaking - Speed up vertical scrolling by implementing `shouldComponentUpdate` for rows. Now it detects whether or not a row has been measured and also does check based on column and row changes like default SCU at reactabular-table.

6.0.3 / 2016-10-19
==================

  * Bug fix - Bump peer version ranges to avoid npm warnings.

6.0.0 / 2016-10-14
==================

  * Feature - Add `scrollTo(index)` method to `Virtualized.Body` `ref`.

5.0.2 / 2016-09-28
==================

  * Bug fix - Skip `setState` on `componentWillReceiveProps` if no rows were calculated. #209

3.0.6 / 2016-09-12
==================

  * Bug fix - Rework initial measurement so that it works with CSS solutions like Radium.

3.0.2 / 2016-09-01
==================

  * Improvement - Push development logging behind `window.LOG_VIRTUALIZED`.

3.0.1 / 2016-09-01
==================

  * Bug fix - Keep header and body in sync when scrolling at header.

3.0.0 / 2016-09-01
==================

  * Initial release.
