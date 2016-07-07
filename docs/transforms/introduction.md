**Transforms** allow you to inject `propTypes` to the current cell. They work with both `header` and `cell` at a column definition. If a transform returns `children` prop, then the returned elements will override the render result. This allows you to implement functionality like inline editing.

The API looks like this:

* `header.transforms = [(<label>, { column: <column>, columnIndex: <number> }) => ({... props ...})]`
* `cell.transforms = [(<value>, { columnIndex: <number>, column: <object>, rowData: <object>, rowIndex: <number>, property: <string> }) => ({... props ...})]`

Transforms are evaluated from left to right from general `props` to `header/cell.props` and finally `header/cell.transforms`. The values they return are [deep merged](https://lodash.com/docs#merge). `className`s are concatenated together. This means the rightmost value will win.
