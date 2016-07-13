**Formatters** provide means to customize Reactabular column definition through `header` and `cell`:

* `header.format = (<label>, { rowData: <label>, column: <column>, columnIndex: <number> }) => <string|React element>`
* `cell.format = (<value>, { rowData: <object>, property: <string>, column: <column>, columnIndex: <number>, rowIndex: <number> }) => <string|React element>`

As long as a formatter returns something that React can render, it will work. The results are rendered **inside** a table cell.

Reactabular provides a formatter to make it easier to highlight search results. It is covered in the next section.

## See Also

* [Resizable Columns](/examples/resizable-columns)
