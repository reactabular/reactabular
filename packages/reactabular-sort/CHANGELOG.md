1.1.4 / 2016-08-04
==================

  * Bug fix - Do not crash if column `cell` definition is missing. #178

1.0.11 / 2016-07-29
===================

  * Bug fix - `sort.reset` accepts object properly now. Earlier it bailed out too early.

1.0.10 / 2016-07-29
===================

  * Improvement - `sort.sort` accepts `event` parameter now. It defaults to `onClick`.
  * Improvement - `sort.reset` is a new transform that can be used to remove the given column from the sorting rules.
  * Improvement - `sort.header` is a new formatter that can be used to apply sorting. This is handy if you use `sort.reset`.

1.0.0 / 2016-07-25
==================

  * Initial release.
