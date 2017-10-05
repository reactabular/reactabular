8.12.0 / 2017-10-05
==================

  * Chore - Support React 16. #324

8.11.0 / 2017-09-25
==================

  * Bug fix - Clear `setTimeout` timer on `componentWillUnmount` to avoid warnings (good practice anyway). #320

8.7.0 / 2017-02-02
==================

  * Feature - Pick up `props.style.maxHeight` at `Virtualized.Body` if it's set. #277

8.6.0 / 2017-01-16
==================

  * Bug fix - Bump lodash peer dependency to v4 minimum. This was expected already, but the version was wrong.

8.5.1 / 2017-01-12
==================

  * Bug fix - Calculate rows when height changes. #270

8.0.0 / 2016-11-27
==================

  * Bug fix - Improve horizontal scrolling performance when used with reactabular-sticky. If it detects Y didn't change while scrolling, it skips rendering now.
  * Bug fix - Skip functions at `BodyRow` `shouldComponentUpdate`.
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

  * Feature - Push development logging behind `window.LOG_VIRTUALIZED`.

3.0.1 / 2016-09-01
==================

  * Bug fix - Keep header and body in sync when scrolling at header.

3.0.0 / 2016-09-01
==================

  * Initial release.
