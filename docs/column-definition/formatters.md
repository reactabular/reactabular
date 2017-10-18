**Formatters** provide means to customize Reactabular column definition through `header` and `cell`:

* `header.formatters = [(<label>, { rowData: <label>, column: <column>, columnIndex: <number> }) => <string|React element>]`
* `cell.formatters = [(<value>, { rowData: <object>, property: <string>, column: <column>, columnIndex: <number>, rowIndex: <number> }) => <string|React element>]`

As long as a formatter returns something that React can render, it will work. The results are rendered recursively from left to right **inside** a table cell.

## See Also

* [Resizing Columns](/features/resizing-columns)
