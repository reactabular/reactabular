**Transforms** allow you to inject `propTypes` to the current cell. They work with both `header` and `cell` at a column definition. If a transform returns `children` prop, then the returned elements will override the render result. This allows you to implement functionality like inline editing.

The API looks like this:

* `header.transforms = [(<label>, { cellData: <label> }) => ({... props ...})]`
* `cell.transforms = [(<value>, { cellData: <object>, property: <string> }) => ({... props ...})]`
