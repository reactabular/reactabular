**Transforms** allow you to inject `propTypes` to the current cell. They work with both `header` and `cell` at a column definition. If a transform returns `children` prop, then the returned elements will override the render result. This allows you to implement functionality like inline editing.

The API looks like this:

* `header.transform = (<label>, { cellData: <label> }) => ({... props ...})`
* `cell.transform = (<value>, { cellData: <object>, property: <string> }) => ({... props ...})`

