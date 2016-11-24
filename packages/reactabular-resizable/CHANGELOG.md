7.1.0 / 2016-xx-xx
==================

  * Feature - Allow `minWidth` to be set per `column` explicitly.
  * Breaking - Push performance optimized resizing to a function. As a result `reactabular-resizable` exposes `column` and `helper` functions now. `column` is the same as before. `helper` implements optional performance optimizations. See the README for usage instructions.

6.0.0 / 2016-10-14
==================

  * Breaking - Drop `styles` prop. Use `props` instead.

5.3.0 / 2016-10-05
==================

  * Feature - Expose `props` prop for customizing `props` of the component. This will replace `styles` eventually.

3.0.0 / 2016-09-01
==================

  * Feature - Expose `parent` prop (defaults to `document`). This is handy if you use an iframe and need something more custom.

2.0.0 / 2016-08-16
==================

  * Breaking - Extract header styling to a separate file (`style.css` at package root) and allow `style` prop to be passed.
  * Feature - Document how to offset the widget. #179.

1.2.2 / 2016-08-07
==================

  * Bug fix - Fix README example as Sticky API has been simplified (no need for ReactDOM anymore).

0.1.0 / 2016-07-26
==================

  * Initial release.
