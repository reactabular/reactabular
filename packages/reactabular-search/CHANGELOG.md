6.1.1 / 2016-10-27
==================

  * Bug fix - Return `false` if `property` is not defined. #228

6.0.0 / 2016-10-14
==================

  * Breaking - `search.multipleColumns` and `search.singleColumn` now accept a `castingStrategy` parameter to define how to cast properties when searching. By default, everything by arrays is cast to a string.
  * Feature - `search.matches` now traverses arrays and returns results in the same shape.

1.0.0 / 2016-07-25
==================

  * Initial release.
