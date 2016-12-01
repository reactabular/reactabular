8.4.0 / 2016-12-01
==================

  * Feature - Expose `onDragColumnStart` and `onDragColumnEnd` at `easy.bindColumns`.

8.3.2 / 2016-12-01
==================

  * Bug fix - Swap resizableHeader and sorting formatter application order to match the original.

8.0.0 / 2016-11-27
==================

  * Feature - Support row dragging. This has been exposed through `onMoveRow({ sourceRowId, targetRowId })`. You are expected to call an algorithm that actually moves the row there. `reactabular-dnd` implements these. Note that this works only while there is no sorting or search query in place!
  * Bug fix - Inject `className` per row only if it has been defined at `onRow`.
  * Bug fix - If a column has width set, set `maxWidth` to it as well. #238
  * Breaking - The API has been partitioned so that the column definition related functionality is bound separately. This makes it possible to implement nested column functionality on top of it. Consider the example below and see the README for more:

```javascript
...

render() {
  ...

  const newColumns = easy.bindColumns({
    toggleChildrenProps: { className: 'toggle-children' },
    sortingColumns,
    rows,
    idField,
    parentField,
    props: this.props,

    // Handlers
    onMoveColumns: this.onMoveColumns,
    onSort: this.onSort,
    onDragColumn: this.onDragColumn,
    onToggleShowingChildren: this.onToggleShowingChildren
  })(columns);

  ...
}

...
```

7.0.0 / 2016-11-03
==================

  * Bug fix - Pass `parentField` to `tree.filter`. Now toggling should work.
  * Breaking - Push `onMoveColumns` behavior out of table core. Now it doesn't maintain table state at all. As a result you need to implement `onMoveColumns` handler like this to make column moving work:

```javascript
onMoveColumns({ columns, source, target }) {
  this.setState({ columns });
}
```

6.1.2 / 2016-10-31
==================

  * Bug fix - Fix `onRow` behavior (match interface with `reactabular-table`). #229

6.1.0 / 2016-10-25
==================

  * Bug fix - Make sure `idField` `prop` works correctly. `tree.sort` needed to receive `idField` for the logic to work.

6.0.3 / 2016-10-19
==================

  * Bug fix - Bump peer version ranges to avoid npm warnings.

6.0.2 / 2016-10-19
==================

  * Feature - Add an example showing how to access `scrollTo`.

6.0.0 / 2016-10-14
==================

  * Breaking - Expose `idField` and `parentField` `props` for customizing tree field types. Earlier `rowKey` handled `idField` but now it has been separated for clarity.
  * Breaking - Drop `styles` prop. Use `props` instead.

5.3.0 / 2016-10-05
==================

  * Feature - Expose `props` prop for customizing `props` of the component. This will replace `styles` eventually.

5.0.1 / 2016-09-28
==================

  * Bug fix - If there are no draggable headers, do *not* inject `dnd.Header`. This means you don't need to set up React DnD if you aren't using drag and drop functionality. #209

5.0.0 / 2016-09-28
==================

  * Breaking - Push children toggle behavior to `onToggleShowingChildren` prop. See the readme for a sample implementation. This makes the implementation more flexible. You can trigger `reactabular-tree` `collapseAll` and `expandAll` over `showingChildren` for instance.

4.2.0 / 2016-09-23
==================

  * Feature - Accept `toggleChildrenProps` for customization.

4.0.0 / 2016-09-12
==================

  * Breaking - Push `onDragColumn` control to user. Earlier it managed widths through CSS (more performant, but also more brittle). The problem with that was that the initial update of a stylesheet could fail (no widths were set). Now widths are controlled by React completely. Note that the API changed to `onDragColumn(width, { columnIndex })`.

3.0.5 / 2016-09-02
==================

  * Bug fix - Pass `rowKey` to `tree.filter`. This way it filters correctly with arbitrary ids.

3.0.4 / 2016-09-02
==================

  * Bug fix - Pass `rowKey` to `tree.toggleChildren`. This way toggling can work with arbitrary ids.

3.0.3 / 2016-09-01
==================

  * Bug fix - Drop redundant `console.log`.

3.0.0 / 2016-09-01
==================

  * Feature - Integrate virtualization for extra performance.
  * Feature - Integrate `reactabular-tree`. Now it works with tree style data. You should set `cell.toggleChildren: true` to show the UI control for toggling row children visibility.

2.0.3 / 2016-08-22
==================

  * Feature - If an empty column definition is provided, escape early and avoid showing a warning per row.

2.0.0 / 2016-08-16
==================

  * Breaking - Push `sortingColumns` to a prop. You should control its state yourself.
  * Feature - Add suggested default styling (`style.css` at package root).
  * Feature - Allow `classNames` and `styles` props to be passed for styling.
  * Bug fix - Force update after mounting. This is needed for the sticky ref scheme to work.

1.2.6 / 2016-08-11
==================

  * Feature - Expose `components`. Now you can override default components just like for a regular `Table.Provider`. Only exception is `header.cell` given drag and drop needs to override that in order to work.
  * Feature - Make `selectedRowIdField` prop optional. It worked before due to the default value, but it's neater this way.

1.2.3 / 2016-08-08
==================

  * Feature - Expose `headerExtra` prop. It can be used to inject extra rows to a header. This works well with `reactabular-search-columns`.
  * Feature - Expose `onSort` and `sortingColumns` props. These are useful for implementing sorting persistency.

1.2.1 / 2016-08-05
==================

  * Feature - Push `reactabular` and `reactabular-utils` as peer dependencies. This way you have better control over which versions to consume at your project.

1.1.6 / 2016-08-05
==================

  * Feature - Trigger `onMoveColumns` only after moving columns has finished.
  * Feature - Expose `selectedRowId`. It defaults to `id`, but if your selection logic relies on some other field, you can change it now.

1.1.3 / 2016-08-04
==================

  * Bug fix - If a header is set both `sortable` and `resizable`, allow custom formatter to used still.

1.1.0 / 2016-08-03
==================

  * Feature - Dropped dependency on react-dom.

1.0.11 / 2016-07-29
===================

  * Feature - Add sorting numbers to the header so you know in which order sorting rules are applied.
  * Feature - Allow column sorting status to be reset by doubleclicking on a column header.
  * Feature - Add support for row selection. Capture the selected row through `onSelectRow`.

1.0.8 / 2016-07-28
==================

  * Feature - Make `tableWidth` and `tableHeight` checks looser. You might want to pass number, string, or something. Perhaps this can be constrained further.

1.0.7 / 2016-07-28
==================

  * Bug fix - Include `dist-modules` to the distribution version. `preversion` script obviously misses.

1.0.6 / 2016-07-27
==================

  * Bug fix - Merge column definition `props.className` correctly. Previously it discarded possible value.
  * Feature - Add styling hooks. Now you can attach classes to the table structure (table, thead, tbody).
  * Feature - Add `onDragColumn` and `onMoveColumns` hooks.

1.0.5 / 2016-07-27
==================

  * Feature - Add column visibility to the example.
  * Feature - Render `EasyTable` in a fixed viewport.
  * Bug fix - Do not re-initialize styles if columns change. Without this CSS resets. I may have to revisit this decision but it seems logical now.
  * Feature - Support `draggable` header flag.

1.0.3 / 2016-07-26
==================

  * Feature - Resolve nested and `cell.resolve` based data.
  * Feature - Support search with highlighting through a `query` prop.

0.1.0 / 2016-07-26
==================

  * Initial release.
